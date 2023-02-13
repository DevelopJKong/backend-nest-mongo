import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const imageFileFilter = (_req: any, file: Express.Multer.File, callback: Function) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (_req: any, file: Express.Multer.File, callback: Function) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${uuid()}-${randomName}${fileExtName}`);
};
