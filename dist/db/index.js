"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connections_1 = __importDefault(require("./connections"));
const associations_1 = require("./associations");
// Associations
(0, associations_1.setAssociations)();
exports.default = connections_1.default;
//# sourceMappingURL=index.js.map