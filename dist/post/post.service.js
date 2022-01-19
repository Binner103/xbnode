"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
const post_provider_1 = require("./post.provider");
exports.getPosts = async () => {
    const statement = `
        SELECT
            post.id,
            post.title,
            post.content,
            ${post_provider_1.sqlFragment.user},
            ${post_provider_1.sqlFragment.totalComments},
            ${post_provider_1.sqlFragment.file}
        FROM post
        ${post_provider_1.sqlFragment.leftJoinUser}
        ${post_provider_1.sqlFragment.leftJoinOneFile}
        GROUP BY post.id
    `;
    const [data] = await mysql_1.connection.promise().query(statement);
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
//# sourceMappingURL=post.service.js.map