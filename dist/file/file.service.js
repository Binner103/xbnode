"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const jimp_1 = __importDefault(require("jimp"));
const mysql_1 = require("../app/database/mysql");
exports.createFile = async (file) => {
    const statement = `
        INSERT INTO file
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, file);
    return data;
};
exports.findFileById = async (fileId) => {
    const statement = `
        SELECT * FROM file
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, fileId);
    return data[0];
};
exports.imageResizer = async (image, file) => {
    const { imageSize } = image['_exif'];
    const filePath = path_1.default.join(file.destination, 'resized', file.filename);
    if (imageSize.width > 1280) {
        image
            .resize(1280, jimp_1.default.AUTO)
            .quality(85)
            .write(`${filePath}-large`);
    }
    if (imageSize.width > 640) {
        image
            .resize(640, jimp_1.default.AUTO)
            .quality(85)
            .write(`${filePath}-medium`);
    }
    if (imageSize.width > 320) {
        image
            .resize(320, jimp_1.default.AUTO)
            .quality(85)
            .write(`${filePath}-thumbnail`);
    }
};
//# sourceMappingURL=file.service.js.map