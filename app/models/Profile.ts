import { Entity, Column, ManyToOne, Repository,
  getRepository, PrimaryGeneratedColumn } from 'typeorm'
import { Matches, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import Checker from '../utils/Checker'
import User from './User'

let profiles: Repository<Profile>

export const init = () => (profiles = getRepository(Profile))

@ValidatorConstraint({ async: true })
class IsNameAlreadyExist implements ValidatorConstraintInterface {
  public validate (name) {
    return profiles.findOne({ name }).then(n => !n)
  }
}

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    unique: true,
    length: 16
  })
  @Checker(IsNameAlreadyExist, { message: 'NAME_EXISTS' })
  @Matches(/^[A-Za-z0-9_-]{2,16}$/)
  public name: string

  @ManyToOne(() => User, user => user.profiles)
  public user: User
}
