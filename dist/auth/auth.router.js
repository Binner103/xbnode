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
const authController = __importStar(require("./auth.controller"));
const auth_middleware_1 = require("./auth.middleware");
const router = express_1.default.Router();
router.post('/login', auth_middleware_1.validateLoginData, authController.login);
router.post('/auth/validate', auth_middleware_1.authGuard, authController.validate);
exports.default = router;
//# sourceMappingURL=auth.router.js.map