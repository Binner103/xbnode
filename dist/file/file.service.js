"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createFile = async (file) => {
    const statement = `
        INSERT INTO file
        SET ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, file);
    return data;
};
exports.findFileById = async (fileId) => {
    const statement = `
        SELECT * FROM file
        WHERE id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, fileId);
    return data[0];
};
//# sourceMappingURL=file.service.js.map