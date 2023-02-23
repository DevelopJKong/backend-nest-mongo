import { MailModuleOptions } from './mail.interface';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { LoggerService } from 'src/libs/logger/logger.service';
import { CONFIG_OPTIONS } from '../common/constants/common.constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    private readonly log: LoggerService,
  ) {}

  /**
   *
   * @returns {object}
   */
  config(): object {
    const {
      service,
      host,
      port,
      secure,
      auth: { user, pass },
    } = this.options;

    const data = {
      service,
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    };

    return data;
  }

  mailVar(email: string, username: string, codeNum: string): object {
    const {
      auth: { user },
    } = this.options;

    const data = {
      from: `${user}`,
      to: email,
      subject: `${username}님 Cafe Small House 에 오신것을 환영합니다!`,
      html: `
      <div style="display:flex; justify-content:center; align-items:center; width:500px; height:500px; flex-direction:column; margin:auto;">
        <strong>Cafe Small House</strong>
        <br/>
        <hr/>
        <p style="font-size:25px">아래에 있는 확인 코드를 입력해주세요☕</p>
        <form action="${process.env.BACKEND_URL}/api/users/email-certifications" method="POST">
          <input type="hidden" name="code" value="${codeNum}"/>
          <input type="hidden" name="email" value="${email}"/>
          <button style="width:100px; height:50px; border-radius:2.222rem; background-color:tomato; color:white;">로그인</button>
        </form>
        <br/>
        <p> 더 열심히 하는 Cafe Small House가 되겠습니다</p>
        <p>&copy; ${new Date().getFullYear()} Cafe Small House</p>
      </div>
      `,
    };
    return data;
  }

  /**
   *
   * @param {Mail.Options} data
   * @returns {string}
   */
  async sendMail(data: Mail.Options): Promise<string> {
    const transporter = nodemailer.createTransport(this.config());
    try {
      const sendMail = await transporter.sendMail(data);
      return sendMail.response;
    } catch (error) {
      this.log
        .logger()
        .error(this.log.loggerInfo('메일을 보내지 못하였습니다', error.message, error.name, error.stack));
      throw new InternalServerErrorException();
    }
  }
}
