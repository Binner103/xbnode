"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createTag = async (tag) => {
    const statement = `
        INSERT INTO tag
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, tag);
    return data;
};
exports.getTagByName = async (tagName) => {
    const statement = `
        SELECT id, name FROM tag
        WHERE name = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, tagName);
    return data[0];
};
//# sourceMappingURL=tag.service.js.map