"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = require("./post.service");
exports.index = (request, response, next) => {
    if (request.headers.authorization !== 'SECRET') {
        return next(new Error());
    }
    const posts = post_service_1.getPosts();
    response.send(posts);
};
//# sourceMappingURL=post.controller.js.map