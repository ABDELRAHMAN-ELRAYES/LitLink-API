import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
@Injectable()
export class JwtTokenService {

  // create a token with user id
  async signToken(id: string, response: Response) {
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    this.sendTokenInCookie(response, token);
    return token ;
  }

  // storing token and send a cookie
  sendTokenInCookie(response: Response, token: string) {
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(
        Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
    });
  }
}
