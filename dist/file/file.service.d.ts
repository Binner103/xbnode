/// <reference types="multer" />
import Jimp from 'jimp';
import { FileModel } from "./file.model";
export declare const createFile: (file: FileModel) => Promise<import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const findFileById: (fileId: number) => Promise<any>;
export declare const imageResizer: (image: Jimp, file: Express.Multer.File) => Promise<void>;
export declare const getPostFiles: (postId: number) => Promise<any>;
export declare const deletePostFiles: (files: FileModel[]) => Promise<void>;
