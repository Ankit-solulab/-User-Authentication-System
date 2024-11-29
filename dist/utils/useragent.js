"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserAgent = void 0;
const useragent_1 = __importDefault(require("useragent"));
const parseUserAgent = (userAgentString) => {
    const agent = useragent_1.default.parse(userAgentString);
    return {
        os: agent.os.toString(),
        deviceType: agent.device.toString(),
        deviceModel: agent.toAgent(),
    };
};
exports.parseUserAgent = parseUserAgent;
//# sourceMappingURL=useragent.js.map