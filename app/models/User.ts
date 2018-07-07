import { Entity, Column, OneToMany, Repository, getRepository, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, Matches, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import Checker from '../utils/Checker'
import Profile from './Profile'

let users: Repository<User>

export const init = () => (users = getRepository(User))

@ValidatorConstraint({ async: true })
class IsUserAlreadyExist implements ValidatorConstraintInterface {
  public validate (name) {
    return users.findOne({ name }).then(n => !n)
  }
}

@ValidatorConstraint({ async: true })
class IsEmailAlreadyExist implements ValidatorConstraintInterface {
  public validate (email) {
    return users.findOne({ email }).then(n => !n)
  }
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    unique: true,
    length: 16
  })
  @Checker(IsUserAlreadyExist, { message: 'NAME_EXISTS' })
  @Matches(/^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,16}$/, { message: 'NAME_WRONG' })
  public name: string

  @Column({ length: 64 })
  public password: string

  @Column({ length: 6 })
  public salt: string

  @Column({ unique: true })
  @Checker(IsEmailAlreadyExist, { message: 'EMAIL_EXISTS' })
  @IsEmail(undefined, { message: 'EMAIL_WRONG' })
  public email: string

  @OneToMany(() => Profile, profile => profile.user)
  public profiles: Profile[]
}
