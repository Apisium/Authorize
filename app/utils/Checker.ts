import { registerDecorator, ValidationOptions } from 'class-validator'

export default (validator, options?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      options,
      validator,
      propertyName,
      constraints: [],
      target: object.constructor
    })
  }
}
