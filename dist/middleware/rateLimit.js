"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.limiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1["default"])({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later"
});
