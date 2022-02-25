"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar dotenv
dotenv_1.default.config();
const config = {
    db_name: process.env.DB_NAME || '',
    db_username: process.env.DB_USERNAME || '',
    db_password: process.env.DB_PASSWORD || '',
    db_host: process.env.DB_HOST || '',
    db_port: Number(process.env.DB_PORT) || 3306,
    jwtSecretPrivateKey: process.env.SECRETORPRIVATEKEY || '',
};
exports.default = config;
//# sourceMappingURL=config.js.map