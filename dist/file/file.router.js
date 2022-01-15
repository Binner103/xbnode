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
const fileController = __importStar(require("./file.controller"));
const file_middleware_1 = require("./file.middleware");
const router = express_1.default.Router();
router.post('/files', auth_middleware_1.authGuard, file_middleware_1.fileInterceptor, file_middleware_1.fileProcessor, fileController.store);
router.get('/files/:fileId/serve', fileController.serve);
router.get('/files/:fileId/metadata', fileController.metadata);
exports.default = router;
//# sourceMappingURL=file.router.js.map