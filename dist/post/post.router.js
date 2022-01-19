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
const postController = __importStar(require("./post.controller"));
const app_middleware_1 = require("../app/app.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = express_1.default.Router();
router.get('/posts', app_middleware_1.requestUrl, postController.index);
router.post('/posts', auth_middleware_1.authGuard, postController.store);
router.patch('/posts/:postId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), postController.update);
router.delete('/posts/:postId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), postController.destroy);
router.post('/posts/:postId/tag', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), postController.storePostTag);
router.delete('/posts/:postId/tag', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), postController.destroyPostTag);
exports.default = router;
//# sourceMappingURL=post.router.js.map