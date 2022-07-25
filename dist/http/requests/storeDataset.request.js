"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDatasetRequest = void 0;
const express_validator_1 = require("express-validator");
exports.storeDatasetRequest = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)(['routes', 'buses'])
        .notEmpty()
        .withMessage('Routes and buses is required'),
    (0, express_validator_1.body)(['routes', 'routes', 'buses.*.capacities']).isArray(),
    (0, express_validator_1.body)([
        'buses.*.name',
        'buses.*.capacities',
        'buses.*.capacities.*.name',
        'buses.*.capacities.*.capacity',
        'buses.*.capacities.*.available',
        'buses.*.cost_per_km',
        'routes.*.name',
        'routes.*.length',
        'routes.*.demand',
        'routes.*.cycle_time',
    ]).notEmpty(),
];
//# sourceMappingURL=storeDataset.request.js.map