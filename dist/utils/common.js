"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const child_process_1 = require("child_process");
const runCommand = (command, args) => new Promise((resolve, reject) => {
    const py = (0, child_process_1.spawn)(command, args);
    py.stderr.on('data', (data) => {
        reject(data);
    });
    py.stdout.on('data', (data) => {
        resolve(JSON.parse(data.toString()));
    });
});
exports.runCommand = runCommand;
//# sourceMappingURL=common.js.map