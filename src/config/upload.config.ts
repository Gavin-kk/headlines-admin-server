import { diskStorage } from 'multer';
import { Request } from 'express';
import { v4 } from 'uuid';
import { extname, join } from 'path';

export type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export const storage = diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    const filePath = join(__dirname, '../upload');
    callback(null, filePath);
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    console.log(file);
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
