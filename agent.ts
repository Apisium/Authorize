import { Agent } from 'egg'
import dev from './app/developmentAgent'

export default async (app: Agent) => {
  if (app.config.env === 'local') await dev(app)
}
