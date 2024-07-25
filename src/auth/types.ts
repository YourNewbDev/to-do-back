export type JwtPayload = {
    username: string,
    userId: string
}

export type JwtPayloadwithRefreshToken = JwtPayload & {
    refreshToken: string
}