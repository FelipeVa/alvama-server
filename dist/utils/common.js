"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRequestValidator = exports.validateRequestMiddleware = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const express_validator_1 = require("express-validator");
const runCommand = (command, args) => new Promise((resolve, reject) => {
    const py = (0, child_process_1.spawn)(command, args);
    py.stderr.on('data', (data) => {
        reject(data.toString());
    });
    py.stdout.on('data', (data) => {
        resolve(JSON.parse(data.toString()));
    });
});
exports.runCommand = runCommand;
const validateRequestMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.validateRequestMiddleware = validateRequestMiddleware;
const withRequestValidator = (validator) => [
    ...validator,
    exports.validateRequestMiddleware,
];
exports.withRequestValidator = withRequestValidator;
//# sourceMappingURL=common.js.map