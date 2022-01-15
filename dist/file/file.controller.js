"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const file_service_1 = require("./file.service");
exports.store = async (request, response, next) => {
    const { id: userId } = request.user;
    const { post: postId } = request.query;
    const fileInfo = lodash_1.default.pick(request.file, [
        'originalname',
        'mimetype',
        'filename',
        'size',
    ]);
    try {
        const data = await file_service_1.createFile(Object.assign(Object.assign(Object.assign({}, fileInfo), { userId,
            postId }), request.fileMetaData));
        response.status(201).send(data);
        ;
    }
    catch (error) {
        next(error);
    }
};
exports.serve = async (request, response, next) => {
    const { fileId } = request.params;
    try {
        const file = await file_service_1.findFileById(parseInt(fileId, 10));
        const { size } = request.query;
        let filename = file.filename;
        let root = 'uploads';
        let resized = 'resized';
        if (size) {
            const imageSize = ['large', 'medium', 'thumbnail'];
            if (!imageSize.some(item => item == size)) {
                throw new Error('FILE_NOT_FOUND');
            }
            const fileExist = fs_1.default.existsSync(path_1.default.join(root, resized, `${filename}-${size}`));
            if (fileExist) {
                filename = `${filename}-${size}`;
                root = path_1.default.join(root, resized);
            }
        }
        response.sendFile(filename, {
            root,
            headers: {
                'Content-Type': file.mimetype,
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.metadata = async (request, response, next) => {
    const { fileId } = request.params;
    try {
        const file = await file_service_1.findFileById(parseInt(fileId, 10));
        const data = lodash_1.default.pick(file, ['id', 'size', 'width', 'height', 'metadata']);
        response.send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=file.controller.js.map