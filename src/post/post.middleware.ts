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

/**
 * 过滤列表
 */
export const filter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 解构查询符
    const { tag, user, action } = request.query;
    
    // 设置默认的过滤
    request.filter = {
        name: 'default',
        sql: 'post.id IS NOT NULL'
    };

    // 按照标签名过滤
    if (tag && !user && !action) {
        request.filter = {
            name: 'tagName',
            sql: 'tag.name = ?',
            param: tag
        }
    }

    // 过滤出用户发布的内容
    if (user && action == 'published' && !tag) {
        request.filter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: user
        };
    }

    // 过滤出用户点赞过的内容
    if (user && action == 'liked' && !tag) {
        request.filter = {
            name: 'userLiked',
            sql: 'user_like_post.userId = ?',
            param: user
        };
    }

    // 下一步
    next();
};

/**
 * 内容分页
 */
export const paginate = (itemsPerPage: number) => {
    return async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        // 当前页码
        const { page = 1 } = request.query;
    
        // 每页内容数量
        const limit = itemsPerPage || 30;
    
        // 计算出偏移量
        const offset = limit * (Number(page) - 1);
    
        // 设置请求中的分页
        request.pagination = { limit, offset };
    
        next();
    };
}