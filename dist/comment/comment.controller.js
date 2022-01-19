"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_service_1 = require("./comment.service");
exports.store = async (request, response, next) => {
    const { id: userId } = request.user;
    const { content, postId } = request.body;
    const comment = {
        content,
        postId,
        userId
    };
    try {
        const data = await comment_service_1.createComment(comment);
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.reply = async (request, response, next) => {
    const { commentId } = request.params;
    const parentId = parseInt(commentId, 10);
    const { id: userId } = request.user;
    const { content, postId } = request.body;
    const comment = {
        content,
        postId,
        userId,
        parentId
    };
    try {
        const reply = await comment_service_1.isReplyComment(parentId);
        if (reply)
            return next(new Error('UNABLE_TO_REPLY_THIS_COMMENT'));
    }
    catch (error) {
        return next(error);
    }
    try {
        const data = await comment_service_1.createComment(comment);
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=comment.controller.js.map