export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  // it must be generated from the user email and the user can change it later from profile
  username: string | null;
  password: string;
  joinedDate?: Date;
  birthdate: Date;
  otp?: string | null;
  isOtpVerified?: boolean | null;
  otpExpiresAt?: Date | null;
}
