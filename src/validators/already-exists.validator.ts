import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): Promise<boolean> {
    return getManager()
      .count(args.targetName.replace('Input', ''), {
        [args.property]: value
      })
      .then(count => {
        return count === 0;
      });
  }
}

export function IsAlreadyExist(validationOptions?: ValidationOptions) {
  return (object: object, property: string) => {
    registerDecorator({
      async: true,
      constraints: [],
      name: 'isAlreadyExist',
      options: validationOptions,
      propertyName: property,
      target: object.constructor,
      validator: IsAlreadyExistConstraint
    });
  };
}
