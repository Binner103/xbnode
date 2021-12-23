"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../app/app.config");
exports.signToken = (options) => {
    const { payload } = options;
    const token = jsonwebtoken_1.default.sign(payload, app_config_1.PRIVATE_KEY, { algorithm: 'RS256' });
    return token;
};
//# sourceMappingURL=auth.service.js.map