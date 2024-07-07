import { IsNotEmpty, IsString, IsStrongPassword, NotContains, Validate } from "class-validator";
import { NoWhitespaceValidator } from "src/common/custom-validators";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Validate(NoWhitespaceValidator)
    userName: string

    @IsString()
    @IsNotEmpty()
    @Validate(NoWhitespaceValidator)
    password: string
}
