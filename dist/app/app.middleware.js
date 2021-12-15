"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUrl = (request, response, next) => {
    console.log(request.url);
    next();
};
exports.defaultErrorHandler = (error, request, response, next) => {
    let statusCode, message;
    switch (error.message) {
        default:
            statusCode = 500;
            message = "服务暂时出了点问题~";
            break;
    }
    response.status(statusCode).send({ message });
};
//# sourceMappingURL=app.middleware.js.map