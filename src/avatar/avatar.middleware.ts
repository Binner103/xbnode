import path from "path";
import Jimp from "jimp";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { fileFilter } from "../file/file.middleware";

const fileUploadFilter = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);

/**
 * 创建一个multer
 */
 const avatarUpload = multer({
    dest: 'uploads/avatar',  // 文件存储位置
    fileFilter: fileUploadFilter,
});

/**
 * 文件拦截器
 */
 export const avatarInterceptor = avatarUpload.single('avatar');

 /**
  * 头像处理器
  */
 export const avatarProcessor = async (
     request: Request,
     response: Response,
     next: NextFunction
 ) => {
     // 准备文件信息
     const {file} = request;

     // 准备文件路径
     const filePath = path.join(file.destination, 'resized', file.filename);

     // 处理头像文件
     try {
         // 读取头像文件
         const image = await Jimp.read(file.path);

         // 调整头像尺寸
         image
            .cover(256, 256)
            .quality(85)
            .write(`${filePath}-large`);
         image
            .cover(126, 126)
            .quality(85)
            .write(`${filePath}-medium`);
         image
            .cover(64, 64)
            .quality(85)
            .write(`${filePath}-small`);
     } catch (error) {
         next(error);
     }
     // 下一步
     next();
 };