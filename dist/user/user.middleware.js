"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const userService = __importStar(require("./user.service"));
exports.validateUserData = async (request, response, next) => {
    console.log('👮 验证用户数据');
    const { name, password } = request.body;
    if (!name)
        return next(new Error('NAME_IS_REQUIRED'));
    if (!password)
        return next(new Error('PASSWORD_IS_REQUIRED'));
    const user = await userService.getUserByName(name);
    if (user)
        return next(new Error('USER_ALREADY_EXIST'));
    next();
};
exports.hashPassword = async (request, response, next) => {
    const { password } = request.body;
    request.body.password = await bcrypt_1.default.hash(password, 10);
    next();
};
exports.validateUpdateUserData = async (request, response, next) => {
    const { validate, update } = request.body;
    const { id: userId } = request.user;
    try {
        if (!lodash_1.default.has(validate, 'password')) {
            return next(new Error('PASSWORD_IS_REQUIRED'));
        }
        const user = await userService.getUserById(userId, { password: true });
        const matched = await bcrypt_1.default.compare(validate.password, user.password);
        if (!matched) {
            return next(new Error('PASSWORD_DOES_NOT_MATCH'));
        }
        if (update.name) {
            const user = await userService.getUserByName(update.name);
            if (user) {
                return next(new Error('USER_ALREADY_EXIST'));
            }
        }
        if (update.password) {
            const matched = await bcrypt_1.default.compare(update.password, user.password);
            if (matched) {
                return next(new Error('PASSWORD_IS_THE_SAME'));
            }
            request.body.update.password = await bcrypt_1.default.hash(update.password, 10);
        }
    }
    catch (error) {
        return next(error);
    }
    next();
};
//# sourceMappingURL=user.middleware.js.map