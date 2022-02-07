import request from 'supertest';
import app from '../app';
import { connection } from './database/mysql';
import { greet } from "./playground/demo";

/**
 * 单元测试
 */
describe('演示单元测试', () => {
    // 测试
    test('测试 greet 函数', () => {
        // 准备
        const greeting = greet('农宏彬');
        
        // 断言
        expect(greeting).toBe('你好, 农宏彬');
    });
});

/**
 * 测试接口
 */
describe('演示接口测试', () => {
    //测试结束以后断开数据库服务
    afterAll(async () => {
        // 断开数据服务连接
        connection.end();
    });

    test('测试 GET /', async () => {
        // 请求接口
        const response = await request(app).get('/');

        // 断言
        expect(response.status).toBe(200);
        expect(response.body).toEqual({title:'开发之路'});
    });

    test('测试 POST /echo', async () => {
        // 请求接口
        const response = await request(app)
            .post('/echo')
            .send({message: '你好~'});

        // 断言
        expect(response.status).toBe(201);
        expect(response.body).toEqual({message: '你好~'});
    });
});