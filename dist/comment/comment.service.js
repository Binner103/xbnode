"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
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
//# sourceMappingURL=comment.service.js.map