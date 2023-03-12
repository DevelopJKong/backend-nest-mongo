import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-helper';

// ! 개발 환경 일 경우
export const boardOptions = {
  storage: diskStorage({
    destination: './files/board',
    filename: editFileName,
  }),
  limits: { fileSize: 5242880 },
  fileFilter: imageFileFilter,
};

export const itemOptions = {
  storage: diskStorage({
    destination: './files/item',
    filename: editFileName,
  }),
  limits: { fileSize: 5242880 },
  fileFilter: imageFileFilter,
};

export const EditorOptions = {
  storage: diskStorage({
    destination: './files/editor',
    filename: editFileName,
  }),
  limits: { fileSize: 5242880 },
  fileFilter: imageFileFilter,
};

export const NoticeOptions = {
  storage: diskStorage({
    destination: './files/notice',
    filename: editFileName,
  }),
  limits: { fileSize: 5242880 },
  fileFilter: imageFileFilter,
};

export const CarouselOptions = {
  storage: diskStorage({
    destination: './files/carousel',
    filename: editFileName,
  }),
  limits: { fileSize: 5242880 },
};
