"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const post_service_1 = require("./post.service");
const tag_service_1 = require("../tag/tag.service");
exports.index = async (request, response, next) => {
    try {
        const posts = await post_service_1.getPosts({
            sort: request.sort,
            filter: request.filter,
            pagination: request.pagination
        });
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
exports.storePostTag = async (request, response, next) => {
    const { postId } = request.params;
    const { name } = request.body;
    let tag;
    try {
        tag = await tag_service_1.getTagByName(name);
    }
    catch (error) {
        return next(error);
    }
    if (tag) {
        try {
            const postTag = await post_service_1.postHasTag(parseInt(postId, 10), tag.id);
            if (postTag)
                return next(new Error('POST_ALREADY_HAS_THIS_TAG'));
        }
        catch (error) {
            return next(error);
        }
    }
    if (!tag) {
        try {
            const data = await tag_service_1.createTag({ name });
            tag = { id: data.insertId };
        }
        catch (error) {
            return next(error);
        }
    }
    try {
        await post_service_1.createPostTag(parseInt(postId, 10), tag.id);
        response.sendStatus(201);
    }
    catch (error) {
        return next(error);
    }
};
exports.destroyPostTag = async (request, response, next) => {
    const { postId } = request.params;
    const { tagId } = request.body;
    try {
        await post_service_1.deletePostTag(parseInt(postId, 10), tagId);
        response.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=post.controller.js.map