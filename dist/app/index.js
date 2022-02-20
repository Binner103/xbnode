"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const post_router_1 = __importDefault(require("../post/post.router"));
const user_router_1 = __importDefault(require("../user/user.router"));
const auth_router_1 = __importDefault(require("../auth/auth.router"));
const file_router_1 = __importDefault(require("../file/file.router"));
const tag_router_1 = __importDefault(require("../tag/tag.router"));
const comment_router_1 = __importDefault(require("../comment/comment.router"));
const avatar_router_1 = __importDefault(require("../avatar/avatar.router"));
const like_router_1 = __importDefault(require("../like/like.router"));
const app_router_1 = __importDefault(require("./app.router"));
const app_middleware_1 = require("./app.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const app = express_1.default();
app.use(cors_1.default({
    origin: "*",
    exposedHeaders: "X-Total-Count",
}));
app.use(express_1.default.json());
app.use(auth_middleware_1.currentUser);
app.use(post_router_1.default, user_router_1.default, auth_router_1.default, file_router_1.default, tag_router_1.default, comment_router_1.default, avatar_router_1.default, like_router_1.default, app_router_1.default);
app.use(app_middleware_1.defaultErrorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map