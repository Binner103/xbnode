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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = __importStar(require("../user/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_config_1 = require("../app/app.config");
exports.validateLoginData = async (request, response, next) => {
    console.log('👮 验证用户登录数据');
    const { name, password } = request.body;
    if (!name)
        return next(new Error('NAME_IS_REQUIRED'));
    if (!password)
        return next(new Error('PASSWORD_IS_REQUIRED'));
    const user = await userService.getUserByName(name, { password: true });
    console.log(user);
    if (!user)
        return next(new Error('USER_DOES_NOT_EXIST'));
    const matched = await bcrypt_1.default.compare(password, user.password);
    if (!matched)
        return next(new Error('PASSWORD_DOES_NOT_MATCH'));
    request.body.user = user;
    next();
};
exports.authGuard = (request, response, next) => {
    console.log('👮 验证用户身份');
    try {
        const authorization = request.header('Authorization');
        if (!authorization)
            throw new Error();
        const token = authorization.replace('Bearer ', '');
        if (!token)
            throw new Error();
        const decoded = jsonwebtoken_1.default.verify(token, app_config_1.PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        request.user = decoded;
        next();
    }
    catch (error) {
        next(new Error('UNAUTHORIZED'));
    }
};
//# sourceMappingURL=auth.middleware.js.map