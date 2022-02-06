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
    const { filter, pagination: { limit, offset } } = options;
    let params = [limit, offset];
    if (filter.param) {
        params = [filter.param, ...params];
    }
    const statement = `
        SELECT
            comment.id,
            comment.content,
            ${comment_provider_1.sqlFragment.user},
            ${comment_provider_1.sqlFragment.post}
            ${filter.name == 'userReplied' ? `, ${comment_provider_1.sqlFragment.repliedComment}` : ''}
            ${filter.name !== 'userReplied' ? `, ${comment_provider_1.sqlFragment.totalReplies}` : ''}
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
        LIMIT ?
        OFFSET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, params);
    return data;
};
exports.getCommentsTotalCount = async (options) => {
    const { filter } = options;
    let params = [];
    if (filter.param) {
        params = [filter.param, ...params];
    }
    const statement = `
        SELECT
            COUNT(
                DISTINCT comment.id
            ) AS total
        FROM
            comment
        ${comment_provider_1.sqlFragment.leftJoinUser}
        ${comment_provider_1.sqlFragment.leftJoinPost}
        WHERE
            ${filter.sql}
    `;
    const [data] = await mysql_1.connection.promise().query(statement, params);
    return data[0].total;
};
exports.getCommentReplies = async (options) => {
    const { commentId } = options;
    const statement = `
        SELECT
            comment.id,
            comment.content,
            ${comment_provider_1.sqlFragment.user}
        FROM
            comment
        ${comment_provider_1.sqlFragment.leftJoinUser}
        WHERE
            comment.parentId = ?
        GROUP BY
            comment.id
    `;
    const [data] = await mysql_1.connection.promise().query(statement, commentId);
    return data;
};
//# sourceMappingURL=comment.service.js.map