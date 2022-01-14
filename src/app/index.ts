import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import { defaultErrorHandler } from './app.middleware';

/**
 * 创建应用
 */
const app = express();

/**
 * 处理JSON
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter, userRouter, authRouter, fileRouter);

/**
 * 使用默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 默认导出应用
 */
export default app;