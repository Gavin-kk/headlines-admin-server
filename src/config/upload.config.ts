import { diskStorage } from 'multer';
import { Request } from 'express';
import { v4 } from 'uuid';
import { extname } from 'path';
import { File } from '../../../nestjs-admin-server/dist/config/upload.config';

export const storage = diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    // 在这里设置文件上传时的名称
    const fileName = `${v4()}.${new Date().getTime()}.${file.encoding}${extname(
      file.originalname,
    )}`;
    callback(null, fileName);
  },
});

export const fileFilter = (
  req: Request,
  file: File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (file.mimetype.indexOf('image') !== -1) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
