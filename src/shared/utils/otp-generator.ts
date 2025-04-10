import { randomInt } from 'node:crypto';

export const generateOtp = (): string => `${randomInt(100000, 999999)}`;
