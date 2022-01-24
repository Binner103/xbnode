"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const file_middleware_1 = require("../file/file.middleware");
const fileUploadFilter = file_middleware_1.fileFilter(['image/png', 'image/jpg', 'image/jpeg']);
const avatarUpload = multer_1.default({
    dest: 'uploads/avatar',
    fileFilter: fileUploadFilter,
});
exports.avatarInterceptor = avatarUpload.single('avatar');
//# sourceMappingURL=avatar.middleware.js.map