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
//# sourceMappingURL=comment.service.js.map