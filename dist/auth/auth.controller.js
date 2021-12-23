"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
exports.login = async (request, response, next) => {
    const { user: { id, name } } = request.body;
    const payload = { id, name };
    try {
        const token = auth_service_1.signToken({ payload });
        response.send({ id, name, token });
    }
    catch (error) {
        next(error);
    }
};
exports.validate = (request, response, next) => {
    console.log(request.user);
    response.sendStatus(200);
};
//# sourceMappingURL=auth.controller.js.map