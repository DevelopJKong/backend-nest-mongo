import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateNoticeInput } from './dto/create-notice.dto';
import { CreateBoardOutput } from '../boards/dto/write-board.dto';
import { commonError } from '../common/constants/error.constants';
import { noticeSuccess } from '../common/constants/success.constants';
import { SeeNoticesOutput } from './dto/see-notices.dto';
import { Notice, NoticeDocument } from './entities/notice.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Notice.name) private readonly notices: Model<NoticeDocument>) {}
  async getSeeNotices(): Promise<SeeNoticesOutput> {
    try {
      const noticesResult = await this.notices.find();

      return {
        ok: true,
        message: {
          text: noticeSuccess.getSeeNotices.text,
          statusCode: HttpStatus.OK,
        },
        notices: noticesResult,
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async postCreateNotice(
    { title, content, navigateUrl, noticeImgName }: CreateNoticeInput,
    file: Express.Multer.File,
  ): Promise<CreateBoardOutput> {
    try {
      await this.notices.create({
        title,
        content,
        navigateUrl,
        noticeImgName,
        noticeImgPath: file.path,
        noticeImgSize: file.size,
      });
      return {
        ok: true,
        message: {
          text: noticeSuccess.postCreateNotice.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
