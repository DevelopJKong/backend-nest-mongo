import { Controller, Post, Body, HttpStatus, Put, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { LoginOutput, LoginInput } from './dto/login.dto';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from './entities/user.entity';
import { EmailCheckInput, EmailCheckOutput } from './dto/email-check.dto';
import { CertificatePhoneInput, CertificatePhoneOutput } from './dto/certificate-phone.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/owner')
  @HttpCode(HttpStatus.OK)
  async getFindById(@AuthUser() authUser: User) {
    return this.usersService.getFindById(authUser.userId);
  }

  @Post('/join')
  @HttpCode(HttpStatus.OK)
  async postJoin(@Body() createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async postLogin(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.postLogin(loginInput);
  }

  @Put('/edit')
  @HttpCode(HttpStatus.OK)
  async editProfile(@Body() editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
    return this.usersService.putEditProfile(editProfileInput);
  }

  @Post('/email-check')
  @HttpCode(HttpStatus.OK)
  async emailCheck(@Body() emailCheckInput: EmailCheckInput): Promise<EmailCheckOutput> {
    return this.usersService.postEmailCheck(emailCheckInput);
  }

  @Post('/certifications')
  @HttpCode(HttpStatus.OK)
  async certificatePhone(@Body() certificatePhoneInput: CertificatePhoneInput): Promise<CertificatePhoneOutput> {
    return this.usersService.postCertificatePhone(certificatePhoneInput);
  }
}
