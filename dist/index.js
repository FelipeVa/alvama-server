"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const services_1 = require("./services");
const storeDataset_request_1 = require("./http/requests/storeDataset.request");
const app = (0, express_1.default)();
const cors = require('cors');
const dotenv = require('dotenv');
/**
 * Loading environment variables from .env file
 */
dotenv.config();
/**
 * Loading middlewares
 */
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
function validate(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
}
/**
 * Services
 */
/**
 * App routes
 */
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/alvama', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.alvamaService.store(req.body);
    res.json(response);
}));
app.post('/datasets', storeDataset_request_1.storeDatasetRequest, validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetService.store(req.body);
    res.json(response);
}));
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map