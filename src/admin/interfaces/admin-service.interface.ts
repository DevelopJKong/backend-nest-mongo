import { CreateBoardOutput } from 'src/boards/dto/create-board.dto';
import { SeeNoticesOutput } from '../dto/see-notices.dto';
import { CreateNoticeInput } from '../dto/create-notice.dto';

export interface IAdminService {
  getSeeNotices(): Promise<SeeNoticesOutput>;
  postCreateNotice(
    { title, content, navigateUrl, noticeImgName }: CreateNoticeInput,
    file: Express.Multer.File,
  ): Promise<CreateBoardOutput>;
}
