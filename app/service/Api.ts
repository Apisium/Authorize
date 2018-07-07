import { Service } from 'egg'
import { getRepository } from 'typeorm'
import { createHash } from 'crypto'
import { validate } from 'class-validator'
import User from '../models/User'
import Profile from '../models/Profile'

const PASSWORD = /^[A-Za-z0-9`=[\];\.,/~!@#$%^*()_+}{:?-]{6,20}$/
const sha256 = (text: string) => createHash('SHA256').update(text).digest('hex')

export default class Api extends Service {
  private readonly users = getRepository(User)
  private readonly profiles = getRepository(Profile)
  public async register (body: {
    readonly name: string
    readonly email: string
    readonly profileName: string
    readonly password: string
  }) {
    let user = await this.users.findOne({ name: body.name })
    if (user) return { error: true, reason: 'HAS_REGISTERED' }

    user = new User()
    const { name = '', email = '', profileName = '', password = '' } = body
    if (!PASSWORD.test(password)) return { error: true, reason: 'PASSWORD_WRONG' }

    const profile = new Profile()
    profile.name = profileName
    const salt = Math.random().toString(32).substring(0, 6)
    user.name = name
    user.email = email
    user.salt = salt
    user.profiles = [profile]
    user.password = sha256(sha256(password) + salt)
    const result = await Promise.all([validate(user), validate(profile)])
    const errors = result[0].concat(result[1])
    if (errors.length) return { error: true, reasons: errors.map(e => e.toString()) }

    await this.profiles.save(profile)
    return { error: false, data: { uuid: (await this.users.save(user)).id } }
  }
}
