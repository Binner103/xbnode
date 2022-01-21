"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = async (request, response, next) => {
    const { sort } = request.query;
    let sqlSort;
    switch (sort) {
        case 'earliest':
            sqlSort = 'post.id ASC';
            break;
        case 'latest':
            sqlSort = 'post.id DESC';
            break;
        case 'most_comments':
            sqlSort = 'totalComments DESC, post.id DESC';
            break;
        default:
            sqlSort = 'post.id DESC';
            break;
    }
    request.sort = sqlSort;
    next();
};
//# sourceMappingURL=post.middelware.js.map