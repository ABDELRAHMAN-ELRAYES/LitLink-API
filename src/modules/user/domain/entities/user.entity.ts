export class User {
  public readonly id?: string | null;
  public readonly joinedDate: Date;
  public firstName: string;
  public lastName: string;
  public email: string;
  public username?: string | null;
  public birthdate: Date;
  public password: string;
  public otp?: string | null;
  public isOtpVerified?: boolean | null;
  public otpExpiresAt?: Date | null;
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    birthdate: Date,
    password: string,
    joinedDate: Date,
    username: string | null,
    otp: string | null,
    isOtpVerified: boolean | null,
    otpExpiresAt: Date | null,
    id: string | null,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.password = password;
    this.joinedDate = joinedDate;
    this.id = id;
    this.username = username;
    this.otp = otp;
    this.isOtpVerified = isOtpVerified;
    this.otpExpiresAt = otpExpiresAt;
  }

  updateName(newName: string) {
    if (!newName.trim()) throw new Error('Invalid name');
    this.firstName = newName;
  }
}
