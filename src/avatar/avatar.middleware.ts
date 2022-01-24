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