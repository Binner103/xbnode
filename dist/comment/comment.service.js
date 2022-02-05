"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
const comment_provider_1 = require("./comment.provider");
exports.createComment = async (comment) => {
    const statement = `
        INSERT INTO comment
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, comment);
    return data;
};
exports.isReplyComment = async (commentId) => {
    const statement = `
        SELECT parentId FROM comment
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, commentId);
    return data[0].parentId ? true : false;
};
exports.updateComment = async (comment) => {
    const { id, content } = comment;
    const statement = `
        UPDATE comment
        SET content = ?
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [content, id]);
    return data;
};
exports.deleteComment = async (commentId) => {
    const statement = `
        DELETE FROM comment
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, commentId);
    return data;
};
exports.getComments = async (options) => {
    const { filter } = options;
    let params = [];
    if (filter.param) {
        params = [filter.param, ...params];
    }
    const statement = `
        SELECT
            comment.id,
            comment.content,
            ${comment_provider_1.sqlFragment.user},
            ${comment_provider_1.sqlFragment.post}
        FROM
            comment
        ${comment_provider_1.sqlFragment.leftJoinUser}
        ${comment_provider_1.sqlFragment.leftJoinPost}
        WHERE
            ${filter.sql}
        GROUP BY
            comment.id
        ORDER BY
            comment.id DESC
    `;
    const [data] = await mysql_1.connection.promise().query(statement, params);
    return data;
};
//# sourceMappingURL=comment.service.js.map