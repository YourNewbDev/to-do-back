import { User } from "@prisma/client";

export class SignResponse {

    accessToken: string

    refreshToken: string
    
    user: User
}