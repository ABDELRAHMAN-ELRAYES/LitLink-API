import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor(@Inject(ConfigService) private config: ConfigService) {
    // genrate a tarnsporter for sending emails
    this.transporter = nodemailer.createTransport({
      host: config.get('MAIL_HOST'),
      port: config.get('MAIL_PORT'),
      service: this.config.get('MAIL_SERVICE'),
      secure: false,
      auth: {
        user: config.get('OFFICIAL_MAIL'),
        pass: config.get('GOOGLE_OFFICIAL_MAIL_SECRET'),
      },
    });
  }
  /**
   *  sending email
   * @param {string} receiver
   * @param {string}  title
   * @param {string}  plainTextBody
   * @param {string}  htmlBody
   */
  async sendMail(
    receiver: string,
    title: string,
    plainTextBody: string,
    htmlBody: string,
  ) {
    await this.transporter.sendMail({
      from: this.config.get('OFFICIAL_MAIL'),
      to: receiver,
      subject: title,
      text: plainTextBody,
      html: htmlBody,
    });
  }
}
