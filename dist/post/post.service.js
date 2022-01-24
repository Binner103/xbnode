"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
const post_provider_1 = require("./post.provider");
exports.getPosts = async (options) => {
    const { sort, filter, pagination: { limit, offset } } = options;
    let params = [limit, offset];
    if (filter.param) {
        params = [filter.param, ...params];
    }
    const statement = `
        SELECT
            post.id,
            post.title,
            post.content,
            ${post_provider_1.sqlFragment.user},
            ${post_provider_1.sqlFragment.totalComments},
            ${post_provider_1.sqlFragment.file},
            ${post_provider_1.sqlFragment.tags}
        FROM post
        ${post_provider_1.sqlFragment.leftJoinUser}
        ${post_provider_1.sqlFragment.leftJoinOneFile}
        ${post_provider_1.sqlFragment.leftJoinTag}
        WHERE ${filter.sql}
        GROUP BY post.id
        ORDER BY ${sort}
        LIMIT ?
        OFFSET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, params);
    return data;
};
exports.createPost = async (post) => {
    const statement = `
        INSERT INTO post
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, post);
    return data;
};
exports.updatePost = async (postId, post) => {
    const statement = `
        UPDATE post
        SET ?
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [post, postId]);
    return data;
};
exports.deletePost = async (postId) => {
    const statement = `
        DELETE FROM post
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, postId);
    return data;
};
exports.createPostTag = async (postId, tagId) => {
    const statement = `
        INSERT INTO post_tag (postId, tagId)
        VALUES(?, ?)
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [postId, tagId]);
    return data;
};
exports.postHasTag = async (postId, tagId) => {
    const statement = `
        SELECT * FROM post_tag
        WHERE postId=? AND tagId=?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [postId, tagId]);
    return data[0] ? true : false;
};
exports.deletePostTag = async (postId, tagId) => {
    const statement = `
        DELETE FROM post_tag
        WHERE postId = ? AND tagId = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [postId, tagId]);
    return data;
};
exports.getPostTotalCount = async (options) => {
    const { filter } = options;
    let params = [filter.param];
    const statement = `
        SELECT
            COUNT(DISTINCT post.id) AS total
        FROM post
        ${post_provider_1.sqlFragment.leftJoinUser}
        ${post_provider_1.sqlFragment.leftJoinOneFile}
        ${post_provider_1.sqlFragment.leftJoinTag}
        WHERE ${filter.sql}
    `;
    const [data] = await mysql_1.connection.promise().query(statement, params);
    return data[0].total;
};
//# sourceMappingURL=post.service.js.map