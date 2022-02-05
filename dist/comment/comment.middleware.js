"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = async (request, response, next) => {
    request.filter = {
        name: 'default',
        sql: 'comment.parentId IS NULL',
    };
    next();
};
//# sourceMappingURL=comment.middleware.js.map