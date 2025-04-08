import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, response, Response } from 'express';
import { LoginDto } from 'src/common/dtos/login.dto';
import { RegisterDto } from 'src/common/dtos/register.dto';
import { generateOtp } from 'src/common/utils/otp-generator';
import { generateUsernameFromEmail } from 'src/common/utils/username-generator';
import { IUser } from 'src/core/interfaces/IUser';
import { MailService } from 'src/infrastructure/email/email.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { BcryptPasswordService } from 'src/infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from 'src/infrastructure/security/jwt-token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository,
    private readonly bcryptPasswordService: BcryptPasswordService,
    private readonly mailSerive: MailService,
    @Inject(ConfigService) private config: ConfigService,
  ) {}
  async login(body: LoginDto, response: Response) {
    // 1- receive user email / username and password
    const { emailOrUsername, password } = body;
    // 2- check if email / username is registered
    const user =
      await this.userRepository.findUserByEmailOrUsername(emailOrUsername);

    // 3- if email / username is not found return exception
    if (!user) {
      throw new UnauthorizedException(
        `Sorry, User with provided ${emailOrUsername} is not Found`,
      );
    }
    const hashedPassword = user.password;

    // 4- if email / username is found validate password
    const isValidPassword = await this.bcryptPasswordService.areMatched(
      hashedPassword,
      password,
    );

    // 5- if the password is not correct send exception
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    // 6- if the password is correct create token and send response
    const { id } = user;
    const token = await this.jwtTokenService.signToken(id, response);
    return {
      status: 'Logged in Successfully',
      data: { user, token, hashedPassword, isValidPassword },
    };
  }
  async register(body: RegisterDto, request: Request) {
    // 1- receive data which will be used for registration
    const { email, password, confirmPassword, birthdate, firstName, lastName } =
      body;

    // 2- check if email / username is registered
    const isAUser = await this.userRepository.findUserByEmail(email);
    // 3- if email is found return exception
    if (isAUser) {
      throw new UnauthorizedException(
        `Sorry, User with provided ${email} is already Found`,
      );
    }
    // 4- validate password with confirmPassword
    const areMatched = confirmPassword === password;
    if (!areMatched) {
      throw new BadRequestException('Sorry, Passwords are not Matched!');
    }
    // 5- hash user password
    const hashedPassword = await this.bcryptPasswordService.hash(password);
    // 6- generate a username from email provided.
    const username = generateUsernameFromEmail(email);
    // 7- gathering data and create new user
    const otpExpiresAt = new Date(
      Date.now() +
        Number(this.config.get('OTP_EXPIRES_IN')) * 24 * 60 * 60 * 1000,
    );
    const otp = generateOtp();
    const hashedOtp = await this.bcryptPasswordService.hash(otp);
    const data = {
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      birthdate,
      otpExpiresAt,
      otp: hashedOtp,
    };
    const user = await this.userRepository.createNewUser(data);
    // 8 - send OTP for email verification using gmail.
    const url = `${this.config.get('CLIENT_URL')}:${this.config.get('PORT')}/users/${user.id}/auth/verify`;
    await this.mailSerive.sendMail(
      email,
      'Account Verification 📩',
      `Use this OTP: ${otp} to verify your account. Or click the following link to verify: ${url} `,
      `<div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Account Verification</h2>
          <p>Use this OTP: <strong>${otp}</strong> to verify your account.</p>
          <p>Or click the following link to verify your account:</p>
          <a href="${url}" target="_blank">${url}</a>
      </div>`,
    );

    return {
      status:
        'Registration was Done Successfully, Check your email for validating your account.',
      data: { user },
    };
  }
  async verifyRegistration(receivedOtp: string, user: IUser, response) {
    // 9- validate OTP
    const { otp, id, otpExpiresAt } = user;
    const isValidOtp = await this.bcryptPasswordService.areMatched(
      otp as string,
      receivedOtp,
    );
    const isExpiredOtp = (otpExpiresAt as Date) < new Date(Date.now());
    if (!isValidOtp || isExpiredOtp) {
      throw new BadRequestException('This OTP is not valid!');
    }
    // 10- change the status of the user
    await this.userRepository.updateUserOtpStatus(id as string);
    // 11- generate a jwt token with the new user id
    const token = await this.jwtTokenService.signToken(id as string, response);
    // TODO: 12- send welcome email using (interceptor)

    return { status: 'success', token };
  }
}
