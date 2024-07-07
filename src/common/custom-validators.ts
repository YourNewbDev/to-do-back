import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: 'noWhitespace', async: false })
export class NoWhitespaceValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value === 'string' && /\s/.test(value)) {
            return false // Invalid if there are whitespaces
        }
        return true // Valid if no whitespaces
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} cannot contain only whitespace characters`;
    }
}





