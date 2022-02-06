"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../auth/auth.middleware");
const commentController = __importStar(require("./comment.controller"));
const comment_middleware_1 = require("./comment.middleware");
const post_middleware_1 = require("../post/post.middleware");
const app_config_1 = require("../app/app.config");
const router = express_1.default.Router();
router.post('/comments', auth_middleware_1.authGuard, commentController.store);
router.post('/comments/:commentId/reply', auth_middleware_1.authGuard, commentController.reply);
router.patch('/comments/:commentId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), commentController.update);
router.delete('/comments/:commentId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), commentController.destroy);
router.get('/comments', comment_middleware_1.filter, post_middleware_1.paginate(app_config_1.COMMENTS_PER_PAGE), commentController.index);
exports.default = router;
//# sourceMappingURL=comment.router.js.map