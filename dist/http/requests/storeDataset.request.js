"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDatasetRequest = void 0;
const express_validator_1 = require("express-validator");
exports.storeDatasetRequest = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)(['routes', 'buses']).notEmpty(),
    (0, express_validator_1.body)(['routes', 'routes', 'buses.*.capacities']).isArray(),
    (0, express_validator_1.body)([
        'buses.*.capacities.*.capacity',
        'buses.*.capacities.*.available',
    ]).notEmpty(),
    (0, express_validator_1.body)(['buses.*.brand', 'buses.*.capacities', 'buses.*.costs']).notEmpty(),
    (0, express_validator_1.body)([
        'routes.*.label',
        'routes.*.number',
        'routes.*.length',
        'routes.*.demand',
        'routes.*.cycle_time',
        'routes.*.fare',
    ]).notEmpty(),
];
//# sourceMappingURL=storeDataset.request.js.map