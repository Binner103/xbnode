"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createUserLikePost = async (userId, postId) => {
    const statement = `
        INSERT INTO
            user_like_post (userId, postId)
        VALUES (?, ?)
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [userId, postId]);
    return data;
};
//# sourceMappingURL=like.service.js.map