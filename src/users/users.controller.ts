import { Controller, Post, Body, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { LoginOutput, LoginInput } from './dto/login.dto';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
