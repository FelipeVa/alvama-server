"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeExecutionRequest = void 0;
const express_validator_1 = require("express-validator");
exports.storeExecutionRequest = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('dataset_id').notEmpty().withMessage('Dataset is required'),
];
//# sourceMappingURL=storeExecution.request.js.map