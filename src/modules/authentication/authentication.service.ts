import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from 'src/common/dtos/login.dto';
import { RegisterDto } from 'src/common/dtos/register.dto';
import { generateOtp } from 'src/common/utils/otp-generator';
import { generateUsernameFromEmail } from 'src/common/utils/username-generator';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { BcryptPasswordService } from 'src/infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from 'src/infrastructure/security/jwt-token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository,
    private readonly bcryptPasswordService: BcryptPasswordService,
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
    console.log(isValidPassword, hashedPassword, password);
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
  async register(body: RegisterDto, response: Response) {
    // 1- receive data which will be used for registration
    const { email, password, confirmPassword, birthdate, firstName, lastName } =
      body;

    // 2- check if email / username is registered
    const isAUser = await this.userRepository.findUserByEmailOrUsername(email);
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
    // 7- create new user
    const otpExpiresAt = new Date(
      Date.now() + Number(process.env.OTP_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    );
    const otp = generateOtp();
    const data = {
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      birthdate,
      otpExpiresAt,
      otp,
    };
    const user = await this.userRepository.createNewUser(data);
    // 8 - send OTP for email verification using gmail.

    // TODO: another function for OTP verification
    // 9- validate OTP
    // 10- generate a jwt token with the new user id
    // 11- login user

    // const {id} = user;
    // const token = await this.jwtTokenService.signToken(id, response);
    return {
      status:
        'Registration was Done Successfully, Check your email for validating your account.',
      data: { user },
    };
  }
}
