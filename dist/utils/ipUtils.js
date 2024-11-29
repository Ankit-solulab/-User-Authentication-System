"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeoLocation = void 0;
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const getGeoLocation = (ipAddress) => {
    return geoip_lite_1.default.lookup(ipAddress);
};
exports.getGeoLocation = getGeoLocation;
//# sourceMappingURL=ipUtils.js.map