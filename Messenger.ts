import { Messenger as IM } from 'egg'

export default interface Messenger extends IM {
  on (action: string, cb: (arg: any) => void): this
}
