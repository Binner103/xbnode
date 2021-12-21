import express from 'express';
import * as userController from './user.controller';
import { validateUserData, hashPassword } from './user.middleware';

const router = express.Router();

/**
 * 验证和创建用户
 */
router.post('/users', validateUserData, hashPassword, userController.store);

/**
 * 导出路由
 */
export default router;