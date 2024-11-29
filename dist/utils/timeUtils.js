"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRemainingTime = void 0;
const calculateRemainingTime = (now, blockedUntil) => {
    const diff = blockedUntil.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
};
exports.calculateRemainingTime = calculateRemainingTime;
//# sourceMappingURL=timeUtils.js.map