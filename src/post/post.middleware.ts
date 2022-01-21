import { Request, Response, NextFunction } from 'express';

/**
 * 排序方式
 */
export const sort = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 获取客户端排序方式
    const { sort } = request.query;
    
    // 排序用的 sql
    let sqlSort: string;

    // 设置排序用的SQL
    switch (sort) {
        // 按照内容ID升序
        case 'earliest':
            sqlSort = 'post.id ASC';
            break;
        // 按照内容ID降序
        case 'latest':
            sqlSort = 'post.id DESC';
            break;
        // 按照评论数降序
        case 'most_comments':
            sqlSort = 'totalComments DESC, post.id DESC';
            break;
        // 默认按ID降序
        default:
            sqlSort = 'post.id DESC'
            break;
    }

    // 在请求中添加排序
    request.sort = sqlSort;

    // 下一步
    next();
};