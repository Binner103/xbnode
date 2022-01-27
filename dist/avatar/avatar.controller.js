"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const avatar_service_1 = require("./avatar.service");
exports.store = async (request, response, next) => {
    const { id: userId } = request.user;
    const fileInfo = lodash_1.default.pick(request.file, ['mimetype', 'filename', 'size']);
    const avatar = Object.assign(Object.assign({}, fileInfo), { userId });
    try {
        const data = await avatar_service_1.createAvatar(avatar);
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.serve = async (request, response, next) => {
    const { userId } = request.params;
    try {
        const avatar = await avatar_service_1.findAvatarByUserId(parseInt(userId, 10));
        if (!avatar) {
            throw new Error('FILE_NOT_FOUND');
        }
        const { size } = request.query;
        let filename = avatar.filename;
        let root = path_1.default.join('uploads', 'avatar');
        let resized = 'resized';
        if (size) {
            const imageSizes = ['large', 'medium', 'small'];
            if (!imageSizes.some(item => item == size)) {
                throw new Error('FILE_NOT_FOUND');
            }
            const fileExist = fs_1.default.existsSync(path_1.default.join(root, resized, `${filename}-${size}`));
            if (!fileExist) {
                throw new Error('FILE_NOT_FOUND');
            }
            if (fileExist) {
                filename = `${filename}-${size}`;
                root = path_1.default.join(root, resized);
            }
        }
        response.sendFile(filename, {
            root,
            headers: {
                'Content-Type': avatar.mimetype,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=avatar.controller.js.map