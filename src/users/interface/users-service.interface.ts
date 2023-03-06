import { FindByEmailOutput } from '../dto/find-by-email.dto';
import { FindByIdOutput } from '../dto/find-by-id.dto';
import { JoinInput, JoinOutput } from '../dto/join.dto';
import { LoginOutput, LoginInput } from '../dto/login.dto';
import { CertificateEmailInput } from '../dto/certificate-email.dto';
import { Response } from 'express';
import { EditProfileOutput, EditProfileInput } from '../dto/edit-profile.dto';
import { EmailCheckInput, EmailCheckOutput } from '../dto/email-check.dto';
import { CertificatePhoneOutput, CertificatePhoneInput } from '../dto/certificate-phone.dto';

export interface IUserService {
  getFindById: (id: string) => Promise<FindByIdOutput>;
  getFindByEmail: (email: string) => Promise<FindByEmailOutput>;
  postJoin: (createUserInput: JoinInput) => Promise<JoinOutput>;
  postLogin: (loginInput: LoginInput) => Promise<LoginOutput>;
  postCertificateEmail: (certificateEmailInput: CertificateEmailInput, response: Response) => Promise<void>;
  putEditProfile: (editProfileInput: EditProfileInput) => Promise<EditProfileOutput>;
  postEmailCheck: (emailCheckInput: EmailCheckInput) => Promise<EmailCheckOutput>;
  postCertificatePhone: (certificatePhoneInput: CertificatePhoneInput) => Promise<CertificatePhoneOutput>;
}
