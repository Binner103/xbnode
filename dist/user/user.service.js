"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createUser = async (user) => {
    const statement = `
        INSERT INTO user
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, user);
    return data;
};
exports.getUserByName = async (name, options = {}) => {
    const { password } = options;
    const statement = `
        SELECT id,
        name
        ${password ? ', password' : ''}
        FROM user
        WHERE name = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, name);
    return data[0];
};
//# sourceMappingURL=user.service.js.map