"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = async (request, response, next) => {
    const { name, password } = request.body;
    response.send({ message: `欢迎回来 , ${name}` });
};
//# sourceMappingURL=auth.controller.js.map