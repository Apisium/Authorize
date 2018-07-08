import * as Bundler from 'parcel-bundler'
import * as serveStatic from 'koa-static'
import * as AnsiToHtml from 'ansi-to-html'
import * as prettyError from 'parcel-bundler/src/utils/prettyError'
import { parse } from 'url'
import { join, extname, basename } from 'path'

const ansiToHtml = new AnsiToHtml({ newline: true })
const file = join(__dirname, '../../web/index.html')

export default options => {
  const bundler = new Bundler(file, options)
  bundler.bundle()
  const st = serveStatic(bundler.options.outDir, { index: null })

  return async (ctx, next) => {
    await next()
    if ((ctx.method !== 'HEAD' && ctx.method !== 'GET') ||
      ctx.body != null || ctx.status !== 404) return

    if (bundler.pending) {
      await new Promise(resolve => bundler.once('bundled', resolve))
    }

    const { pathname = '' } = parse(ctx.url)
    if (bundler.error) {
      ctx.set('Content-Type', 'text/html; charset=utf-8')
      ctx.status = 500
      let errorMessage = '<h1>🚨 Build Error</h1>'
      const { message, stack } = prettyError(bundler.error, { color: true })
      errorMessage += `<p><b>${message}</b></p>`
      if (stack) {
        errorMessage += '<div style="background: black; padding: 1rem;">' +
          ansiToHtml.toHtml(stack) + '</div>'
      }
      ctx.body = '<!doctype html>\n<head><title>🚨 Build Error</title></head>\n' +
        '<body style="font-family: monospace; white-space: pre;">' + errorMessage + '</body>'
      return
    } else if (
      !pathname.startsWith(bundler.options.publicURL) ||
      extname(pathname) === ''
    ) {
      if (bundler.mainBundle.type === 'html') {
        ctx.url = `/${basename(bundler.mainBundle.name)}`
        await st(ctx, () => {})
      }
    } else {
      ctx.url = pathname.slice(bundler.options.publicURL.length)
      await st(ctx, () => {})
    }
  }
}
