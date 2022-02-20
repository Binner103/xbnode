import path from 'path';
import fs from 'fs';
import Jimp from 'jimp';
import { connection } from "../app/database/mysql";
import { FileModel } from "./file.model";

/**
 * 存储文件信息
 */
export const createFile = async (
    file: FileModel
) => {
    // 准备查询
    const statement = `
        INSERT INTO file
        SET ?
    `;
    // 执行查询
    const [data] = await connection.promise().query(statement, file);

    // 返回数据
    return data;
};

/**
 * 按ID查找文件
 */
export const findFileById = async (
    fileId: number
) => {
    // 准备查询
    const statement = `
        SELECT * FROM file
        WHERE id = ?
    `;

    // 执行查询
    const [data] = await connection.promise().query(statement, fileId);

    // 返回数据
    return data[0];
};

/**
 * 调整图像尺寸
 */
export const imageResizer = async (
    image: Jimp,
    file: Express.Multer.File
) => {
    // 图像尺寸
    const { imageSize } = image['_exif'];

    // 文件路径
    const filePath = path.join(file.destination, 'resized', file.filename);

    // 大尺寸
    if (imageSize.width > 1280) {
        image
            .resize(1280, Jimp.AUTO)
            .quality(85)
            .write(`${filePath}-large`);
    }

    // 中等尺寸
    if (imageSize.width > 640) {
        image
            .resize(640, Jimp.AUTO)
            .quality(85)
            .write(`${filePath}-medium`);
    }

    // 缩略图
    if (imageSize.width > 320) {
        image
            .resize(320, Jimp.AUTO)
            .quality(85)
            .write(`${filePath}-thumbnail`);
    }
};

/**
 * 找出内容相关文件
 */
export const getPostFiles = async (postId: number) => {
    const statement = `
        SELECT
            file.filename
        FROM
            file
        WHERE
            postId = ?
    `;

    // 执行
    const [data] = await connection.promise().query(statement, postId);

    return data as any;
};

/**
 * 删除内容文件
 */
export const deletePostFiles = async (files: Array<FileModel>) => {
    const uploads = 'uploads';
    const resized = [uploads, 'resized'];

    files.map(file => {
        const filesToDelete = [
            [uploads, file.filename],
            [...resized, `${file.filename}-thumbnail`],
            [...resized, `${file.filename}-medium`],
            [...resized, `${file.filename}-large`],
        ];

        filesToDelete.map(item => {
            const filePath = path.join(...item);

            fs.stat(filePath, (error, stats) => {
                if (stats) {
                    fs.unlink(filePath, error => {
                        if (error) throw error;
                    });
                }
            });
        });
    });
};