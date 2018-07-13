import * as Bundler from 'parcel-bundler'
import { Agent } from 'egg'

export default async (app: Agent) => {
  const bundler = new Bundler(app.config.devPath)
  await bundler.bundle()
  bundler
    .on('bundled', () => app.messenger.sendToApp('bundled', bundler.error))
    .on('buildStart', () => app.messenger.sendToApp('buildStart', null))
}
