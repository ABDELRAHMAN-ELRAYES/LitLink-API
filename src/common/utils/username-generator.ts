import { generateFromEmail } from 'unique-username-generator';

export const generateUsernameFromEmail = (email: string) =>
  generateFromEmail(email, 4);
