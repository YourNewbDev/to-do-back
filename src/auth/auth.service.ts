import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignInInput } from './dto/signin-input';
import { error } from 'console';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signUp(SignUpInput: SignUpInput, res: Response) {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          userName: SignUpInput.username
        }
      })

      if (userExist) {
        throw new BadRequestException(`Username ${userExist.userName} already exist`)
      }

      const saltOrRounds = 10
      const password = SignUpInput.password
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)

      const user = await this.prisma.user.create({
        data: {
          userName: SignUpInput.username,
          password: hashedPassword
        }
      })

      const { accessToken, refreshToken } = await this.createTokens(
        user.id,
        user.userName
      )

      await this.updateRefreshToken(user.id, refreshToken)

      res.cookie('token', accessToken, {})

      return res.send({
        message: 'Logged in successfully',
        token: accessToken
      })

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error
    }
  }

  async signIn(SignInInput: SignInInput, req: Request, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userName: SignInInput.username
        }
      })

      if (!user) {
        throw new ForbiddenException(`Username is not registered`)
      }

      const passwordMatch = await bcrypt.compare(SignInInput.password, user.password)

      if (!passwordMatch) {
        throw new ForbiddenException('Password incorrect')
      }

      const {accessToken, refreshToken} = await this.createTokens(
        user.id,
        user.userName,
      )

      await this.updateRefreshToken(user.id, refreshToken)

      if (!accessToken) {
        throw new ForbiddenException('Could not sign in')
      }

      res.cookie('token', accessToken, {})
      console.log(user)
      return res.send({
        message: 'Logged in successfully',
        token: accessToken
      })

    } catch (error) {
      return res.status(403).send({
        message: 'Sign in failed',
        error: error.message
      })
    }
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token')

    return res.send({
      message: 'Logged out successfully'
    })
  }

  async createTokens(userId: string, username: string) {
    const accessToken = await this.jwt.sign(
      {
        userId,
        username,
      },
      {
        expiresIn: '8h',
        secret: this.config.get('JWT_SECRET')
      }
    )

    const refreshToken = await this.jwt.sign(
      {
        userId,
        username,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.config.get('JWT_REFRESH_TOKEN')
      }
    )

    return { accessToken, refreshToken }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const saltOrRounds = 10
    const salt = await bcrypt.genSalt(saltOrRounds)
    const token = refreshToken
    const hashedRefreshToken = await bcrypt.hash(token, salt)

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken
      }
    })
  }

}
