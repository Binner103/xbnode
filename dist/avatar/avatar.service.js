"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createAvatar = async (avatar) => {
    const statement = `
        INSERT INTO avatar
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, avatar);
    return data;
};
exports.findAvatarByUserId = async (userId) => {
    const statement = `
        SELECT *
        FROM avatar
        WHERE userId = ?
        ORDER BY avatar.id DESC
        LIMIT 1
    `;
    const [data] = await mysql_1.connection.promise().query(statement, userId);
    return data[0];
};
//# sourceMappingURL=avatar.service.js.map