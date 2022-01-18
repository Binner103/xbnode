"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_service_1 = require("./tag.service");
exports.store = async (request, response, next) => {
    const { name } = request.body;
    try {
        const tag = await tag_service_1.getTagByName(name);
        if (tag)
            throw new Error('TAG_ALREADY_EXISTS');
        const data = await tag_service_1.createTag({ name });
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=tag.controller.js.map