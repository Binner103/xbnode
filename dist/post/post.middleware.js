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
exports.filter = async (request, response, next) => {
    const { tag, user, action } = request.query;
    request.filter = {
        name: 'default',
        sql: 'post.id IS NOT NULL'
    };
    if (tag && !user && !action) {
        request.filter = {
            name: 'tagName',
            sql: 'tag.name = ?',
            param: tag
        };
    }
    if (user && action == 'published' && !tag) {
        request.filter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: user
        };
    }
    next();
};
//# sourceMappingURL=post.middleware.js.map