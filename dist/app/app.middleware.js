"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUrl = (request, response, next) => {
    console.log(request.url);
    next();
};
exports.defaultErrorHandler = (error, request, response, next) => {
    if (error) {
        console.log('警告: ', error.message);
    }
    let statusCode, message;
    switch (error.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 400;
            message = '请提供用户名';
            break;
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400;
            message = '请提供用户密码';
            break;
        case 'USER_ALREADY_EXIST':
            statusCode = 409;
            message = '用户名已被占用';
            break;
        default:
            statusCode = 500;
            message = "服务暂时出了点问题~";
            break;
    }
    response.status(statusCode).send({ message });
};
//# sourceMappingURL=app.middleware.js.map