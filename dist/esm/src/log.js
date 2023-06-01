let isLogEnabled = false;
export function enableLog(enable = true) {
    isLogEnabled = enable;
}
export function createLogger(namespace = '3d-bin-packing') {
    return log.bind(undefined, namespace);
}
export function log(namespace, ...args) {
    return isLogEnabled ? console.debug([namespace].concat(args)) : undefined;
}
