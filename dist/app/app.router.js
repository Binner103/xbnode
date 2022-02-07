"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (request, response) => {
    response.send({ title: '开发之路' });
});
router.post('/echo', (request, response) => {
    response.status(201).send(request.body);
});
exports.default = router;
//# sourceMappingURL=app.router.js.map