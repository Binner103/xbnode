"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const post_service_1 = require("./post.service");
exports.index = async (request, response, next) => {
    try {
        const posts = await post_service_1.getPosts();
        response.send(posts);
    }
    catch (error) {
        next(error);
    }
};
exports.store = async (request, response, next) => {
    const { title, content } = request.body;
    const { id: userId } = request.user;
    try {
        const data = await post_service_1.createPost({ title, content, userId });
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.update = async (request, response, next) => {
    const { postId } = request.params;
    const post = lodash_1.default.pick(request.body, ['title', 'content']);
    try {
        const data = await post_service_1.updatePost(parseInt(postId, 10), post);
        response.send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.destroy = async (request, response, next) => {
    const { postId } = request.params;
    try {
        const data = await post_service_1.deletePost(parseInt(postId, 10));
        response.send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=post.controller.js.map