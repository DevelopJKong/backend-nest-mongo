import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { Role } from 'src/libs/auth/role.decorator';
import { CreateNoticeInput, CreateNoticeOutput } from './dto/create-notice.dto';
import { SeeNoticesOutput } from './dto/see-notices.dto';
import { NoticeOptions } from '../common/utils/multer.options';
import { FileInterceptor } from '@nestjs/platform-express';
import { I_SERVICE } from '../common/constants/interface.constants';
import { IAdminService } from './interfaces/admin-service.interface';

@Controller('admin')
export class AdminController {
  constructor(@Inject(I_SERVICE.I_ADMIN_SERVICE) private readonly adminService: IAdminService) {}

  @Get('/notices')
  @HttpCode(HttpStatus.OK)
  async getSeeNotices(): Promise<SeeNoticesOutput> {
    return this.adminService.getSeeNotices();
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', NoticeOptions))
  @HttpCode(HttpStatus.CREATED)
  @Role(['Admin'])
  async postCreateNotice(
    @Body() createNoticeInput: CreateNoticeInput,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateNoticeOutput> {
    return this.adminService.postCreateNotice(createNoticeInput, file);
  }
}
