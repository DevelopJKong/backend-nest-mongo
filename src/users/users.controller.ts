import { Controller, Post, Body, HttpStatus, Put, Get, Res, UseFilters, Inject } from '@nestjs/common';
import { JoinInput as JoinInput, JoinOutput as JoinOutput } from './dto/join.dto';
import { LoginOutput, LoginInput } from './dto/login.dto';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from './entities/user.entity';
import { EmailCheckInput, EmailCheckOutput } from './dto/email-check.dto';
import { CertificatePhoneInput, CertificatePhoneOutput } from './dto/certificate-phone.dto';
import { CertificateEmailInput } from './dto/certificate-email.dto';
import { Response } from 'express';
import { Role } from '../libs/auth/role.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiMovedPermanentlyResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindByIdOutput } from './dto/find-by-id.dto';
import { USER_SUCCESS } from '../common/constants/success.constants';
import { USER_ERROR, COMMON_ERROR } from '../common/constants/error.constants';
import { USER_SUCCESS_RESPONSE } from '../common/constants/swagger/user/user-success-response.constant';
import { USER_ERROR_RESPONSE } from '../common/constants/swagger/user/user-error-response.constant';
import { USER_BODY_OBJECT } from '../common/constants/swagger/user/user-body-object.constant';
import { USER_OPERATION } from '../common/constants/swagger/user/user-operation.constant';
import { USER_BODY_DESCRIPTION } from '../common/constants/swagger/user/user-body-description.constant';
import { IUsersService } from './interface/users-service.interface';
import { I_SERVICE } from '../common/constants/interface.constants';

@Controller('users')
@ApiTags('유저-API')
export class UsersController {
  constructor(@Inject(I_SERVICE.I_USERS_SERVICE) private readonly usersService: IUsersService) {}

  // ! 소유자 호출 API [성공 & 실패 케이스 완료]
  @Get('/owner')
  @ApiOperation({
    summary: USER_OPERATION.getFindById.summary,
    description: USER_OPERATION.getFindById.description,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.getFindById.text,
    schema: USER_SUCCESS_RESPONSE.getFindById,
    status: HttpStatus.OK,
    type: FindByIdOutput,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  @UseFilters()
  @HttpCode(HttpStatus.OK)
  async getFindById(@AuthUser() authUser: User): Promise<FindByIdOutput> {
    return this.usersService.getFindById(authUser.userId);
  }

  // ! 회원가입 API [성공 & 실패 케이스 완료]
  @Post('/join')
  @ApiOperation({
    summary: USER_OPERATION.postJoin.summary,
    description: USER_OPERATION.postJoin.description,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.postJoin.text,
    schema: USER_SUCCESS_RESPONSE.postJoin,
    status: HttpStatus.CREATED,
    type: JoinOutput,
  })
  // ? 401 에러 케이스
  @ApiUnauthorizedResponse({
    description: USER_ERROR.notMatchedPasswords.text,
    schema: USER_ERROR_RESPONSE.postJoin.unauthorized,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.existUser.text,
    schema: USER_ERROR_RESPONSE.postJoin.badRequest,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.postJoin.description,
    schema: USER_BODY_OBJECT.postJoin,
    type: JoinInput,
  })
  @HttpCode(HttpStatus.CREATED)
  async postJoin(@Body() joinInput: JoinInput): Promise<JoinOutput> {
    return this.usersService.postJoin(joinInput);
  }

  @Post('/login')
  @ApiOperation({ summary: USER_OPERATION.postLogin.summary, description: USER_OPERATION.postLogin.description })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.postLogin.text,
    schema: USER_SUCCESS_RESPONSE.postLogin,
    status: HttpStatus.OK,
    type: LoginOutput,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.notExistUser.text,
    content: USER_ERROR_RESPONSE.postLogin.badRequest,
  })
  // ? 401 에러 케이스
  @ApiUnauthorizedResponse({
    description: USER_ERROR.wrongPassword.text,
    schema: USER_ERROR_RESPONSE.postLogin.unauthorized,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  @HttpCode(HttpStatus.OK)
  async postLogin(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.postLogin(loginInput);
  }

  @Post('/email-check')
  @ApiOperation({
    summary: USER_OPERATION.postEmailCheck.summary,
    description: USER_OPERATION.postEmailCheck.description,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.postEmailCheck.text,
    schema: USER_SUCCESS_RESPONSE.postEmailCheck,
    status: HttpStatus.OK,
    type: EmailCheckOutput,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.existUser.text,
    content: USER_ERROR_RESPONSE.postEmailCheck.badRequest,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.postEmailCheck.description,
    schema: USER_BODY_OBJECT.postEmailCheck,
    type: EmailCheckInput,
  })
  @HttpCode(HttpStatus.OK)
  async emailCheck(@Body() emailCheckInput: EmailCheckInput): Promise<EmailCheckOutput> {
    return this.usersService.postEmailCheck(emailCheckInput);
  }

  // ! 정리 필요
  @Post('/email-certifications')
  @ApiOperation({
    summary: USER_OPERATION.postCertificateEmail.summary,
    description: USER_OPERATION.postCertificateEmail.summary,
  })
  // * 성공 케이스
  @ApiMovedPermanentlyResponse({
    description: USER_SUCCESS.postCertificateEmail.text,
    status: HttpStatus.MOVED_PERMANENTLY,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  @HttpCode(HttpStatus.OK)
  async postCertificateEmail(
    @Body() certificateEmailInput: CertificateEmailInput,
    @Res() response: Response,
  ): Promise<void> {
    return this.usersService.postCertificateEmail(certificateEmailInput, response);
  }

  @Post('/certifications')
  @ApiOperation({
    summary: USER_OPERATION.postCertificatePhone.summary,
    description: USER_OPERATION.postCertificatePhone.summary,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.postCertificationPhone.text,
    schema: USER_SUCCESS_RESPONSE.postCertification,
    status: HttpStatus.OK,
    type: CertificatePhoneOutput,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: USER_ERROR.existUser.text,
    schema: USER_ERROR_RESPONSE.postCertification.notEmail,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.postCertificatePhone.description,
    schema: USER_BODY_OBJECT.postCertification,
    type: CertificatePhoneInput,
  })
  @HttpCode(HttpStatus.OK)
  async certificatePhone(@Body() certificatePhoneInput: CertificatePhoneInput): Promise<CertificatePhoneOutput> {
    return this.usersService.postCertificatePhone(certificatePhoneInput);
  }

  @Put('/edit')
  @Role(['User', 'Admin'])
  @ApiOperation({
    summary: USER_OPERATION.putEditProfile.summary,
    description: USER_OPERATION.putEditProfile.description,
  })
  // * 성공 케이스
  @ApiOkResponse({
    description: USER_SUCCESS.putEditProfile.text,
    schema: USER_SUCCESS_RESPONSE.putEditProfile,
    status: HttpStatus.OK,
    type: EditProfileOutput,
  })
  // ? 400 에러 케이스
  @ApiBadRequestResponse({
    description: `${USER_ERROR.existUser.text} | ${USER_ERROR.notExistUser.text}`,
    content: USER_ERROR_RESPONSE.putEditProfile.badRequest,
  })
  // ? 401 에러 케이스
  @ApiUnauthorizedResponse({
    description: USER_ERROR.wrongPassword.text,
    schema: USER_ERROR_RESPONSE.putEditProfile.wrongPassword,
  })
  // ? 500 에러 케이스
  @ApiInternalServerErrorResponse({
    description: COMMON_ERROR.extraError.text,
    schema: USER_ERROR_RESPONSE.internalServerError,
  })
  // 요청 바디
  @ApiBody({
    description: USER_BODY_DESCRIPTION.postEditProfile.description,
    schema: USER_BODY_OBJECT.putEditProfile,
    type: EditProfileInput,
  })
  @HttpCode(HttpStatus.OK)
  async editProfile(@Body() editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
    return this.usersService.putEditProfile(editProfileInput);
  }
}
