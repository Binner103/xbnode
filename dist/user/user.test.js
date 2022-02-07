"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../app"));
const mysql_1 = require("../app/database/mysql");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("./user.service");
const testUser = {
    name: 'xb2-test-user-name',
    password: '111111',
};
const testUserUpdate = {
    name: 'xb2-test-user-new-name',
    password: '222222',
};
let testUserCreated;
afterAll(async () => {
    if (testUserCreated) {
        await user_service_1.deleteUser(testUserCreated.id);
    }
    mysql_1.connection.end();
});
describe('测试创建用户接口', () => {
    test('创建用户时必须提供用户名', async () => {
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({ password: testUser.password });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: '请提供用户名' });
    });
    test('创建用户时必须提供密码', async () => {
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({ name: testUser.name });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: '请提供用户密码' });
    });
    test('成功创建用户以后,响应状态码应该是 201', async () => {
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send(testUser);
        testUserCreated = await user_service_1.getUserById(response.body.insertId, { password: true });
        expect(response.status).toBe(201);
    });
});
describe('测试用户账户接口', () => {
    test('响应里应该包含指定的属性', async () => {
        const response = await supertest_1.default(app_1.default).get(`/users/${testUserCreated.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testUser.name);
        expect(response.body).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            avatar: null,
        });
    });
    test('当用户不存在时,响应的状态码是 404', async () => {
        const response = await supertest_1.default(app_1.default).get('/users/-1');
        expect(response.status).toBe(404);
    });
});
describe('测试更新用户接口', () => {
    test('更新用户时需要验证用户身份', async () => {
        const response = await supertest_1.default(app_1.default).patch('/users');
        expect(response.status).toBe(401);
    });
    test('更新用户数据', async () => {
        const token = auth_service_1.signToken({
            payload: { id: testUserCreated.id, name: testUserCreated.name }
        });
        const response = await supertest_1.default(app_1.default)
            .patch('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
            validate: {
                password: testUser.password,
            },
            update: {
                name: testUserUpdate.name,
                password: testUserUpdate.password,
            },
        });
        const user = await user_service_1.getUserById(testUserCreated.id, { password: true });
        const matched = await bcrypt_1.default.compare(testUserUpdate.password, user.password);
        expect(response.status).toBe(200);
        expect(matched).toBeTruthy();
        expect(user.name).toBe(testUserUpdate.name);
    });
});
//# sourceMappingURL=user.test.js.map