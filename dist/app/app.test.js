"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mysql_1 = require("./database/mysql");
const demo_1 = require("./playground/demo");
describe('演示单元测试', () => {
    test('测试 greet 函数', () => {
        const greeting = demo_1.greet('农宏彬');
        expect(greeting).toBe('你好, 农宏彬');
    });
});
describe('演示接口测试', () => {
    afterAll(async () => {
        mysql_1.connection.end();
    });
    test('测试 GET /', async () => {
        const response = await supertest_1.default(app_1.default).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: '开发之路' });
    });
    test('测试 POST /echo', async () => {
        const response = await supertest_1.default(app_1.default)
            .post('/echo')
            .send({ message: '你好~' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: '你好~' });
    });
});
//# sourceMappingURL=app.test.js.map