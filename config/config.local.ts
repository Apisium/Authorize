import { DefaultConfig } from './config.default'
import { join } from 'path'

export default () => {
  const config: DefaultConfig = {
    middleware: ['hotReload'],
    devPath: join(__dirname, '../web/index.html'),
    hotReload: {
      outDir: join(__dirname, '../dist')
    }
  }
  return config
}
