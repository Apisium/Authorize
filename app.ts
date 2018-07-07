import { join } from 'path'
import { promisify } from 'util'
import { Application } from 'egg'
import { createConnection } from 'typeorm'
import * as glob from 'glob'

export default (app: Application) => {
  const config = app.config.orm
  app.beforeStart(async () => {
    let paths = await promisify(glob)(join(app.baseDir, 'app/models/**/*'))
    const models = paths.map(require)
    paths = models.map(p => p && (p.default || p)).filter(Boolean)
    await Promise.all((Array.isArray(config) ? config : [config])
      .map((c = {}) => createConnection({
        type: 'sqlite',
        database: 'database.db',
        ...c,
        entities: [...(c.entities || []), ...paths]
      }).catch(e => {
        if (!e || !e.toString().includes('AlreadyHasActiveConnectionError')) throw e
      })))
    models.map(m => m && typeof m.init === 'function' && m.init())
  })
}
