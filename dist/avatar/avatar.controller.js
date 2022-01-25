"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=avatar.controller.js.map