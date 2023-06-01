"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.createLogger = exports.enableLog = void 0;
let isLogEnabled = false;
function enableLog(enable = true) {
    isLogEnabled = enable;
}
exports.enableLog = enableLog;
function createLogger(namespace = '3d-bin-packing') {
    return log.bind(undefined, namespace);
}
exports.createLogger = createLogger;
function log(namespace, ...args) {
    return isLogEnabled ? console.debug([namespace].concat(args)) : undefined;
}
exports.log = log;
