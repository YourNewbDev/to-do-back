import { IsNotEmpty, IsString } from "class-validator"

export class SignUpInput {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}