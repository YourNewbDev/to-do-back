import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInInput {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}