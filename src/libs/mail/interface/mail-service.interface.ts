import Mail from 'nodemailer/lib/mailer';
export interface IMailService {
  config(): object;
  mailVar(email: string, username: string, codeNum: string): object;
  sendMail(data: Mail.Options): Promise<string>;
}
