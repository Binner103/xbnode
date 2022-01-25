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
//# sourceMappingURL=avatar.service.js.map