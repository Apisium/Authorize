import * as serveStatic from 'koa-static'
import * as AnsiToHtml from 'ansi-to-html'
import * as prettyError from 'parcel-bundler/src/utils/prettyError'

const ansiToHtml = new AnsiToHtml({ newline: true })

export default config => {
  const st = serveStatic(config.outDir, { index: null })
  return async (ctx, next) => {
    await next()
    if ((ctx.method !== 'HEAD' && ctx.method !== 'GET') ||
      ctx.body != null || ctx.status !== 404) return

    const { app } = ctx
    if (app.pending) {
      await new Promise(resolve => app.pendingList.push(resolve))
    }

    if (app.bundleError) {
      ctx.set('Content-Type', 'text/html; charset=utf-8')
      ctx.status = 500
      let errorMessage = '<h1>🚨 Build Error</h1>'
      const { message, stack } = prettyError(app.bundleError, { color: true })
      errorMessage += `<p><b>${message}</b></p>`
      if (stack) {
        errorMessage += '<div style="background: black; padding: 1rem;">' +
          ansiToHtml.toHtml(stack) + '</div>'
      }
      ctx.body = '<!doctype html>\n<head><title>🚨 Build Error</title></head>\n' +
        '<body style="font-family: monospace; white-space: pre;">' + errorMessage + '</body>'
      return
    } else {
      console.log(ctx.url)
      await st(ctx, () => {})
    }
  }
}
