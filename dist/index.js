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
const services_1 = require("./services");
const requests_1 = require("./http/requests");
const common_1 = require("./utils/common");
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
app.use(express_1.default.urlencoded({ extended: false, limit: '1000kb' }));
/**
 * App routes
 */
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
/**
 * Dataset
 */
app.get('/datasets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetService.index();
    res.json(response);
}));
app.post('/datasets', (0, common_1.withRequestValidator)(requests_1.storeDatasetRequest), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetService.store(req.body);
    res.json(response);
}));
/**
 * Dataset Results
 */
app.get('/datasets/results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetResultService.index();
    res.json(response);
}));
app.get('/datasets/results/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetResultService.show(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Result not found',
        });
    }
    res.json(response);
}));
/**
 * Dataset Executions
 */
app.get('/datasets/executions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetExecutionService.index();
    res.json(response);
}));
app.post('/datasets/executions', (0, common_1.withRequestValidator)(requests_1.storeExecutionRequest), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataset = yield services_1.datasetService.show(req.body.dataset_id);
    if (!dataset) {
        return res.status(404).json({
            message: 'Dataset not found',
        });
    }
    try {
        const response = yield services_1.datasetExecutionService.store(req.body);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * Dataset single resource actions
 */
app.get('/datasets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetService.show(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Dataset not found',
        });
    }
    res.json(response);
}));
app.delete('/datasets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.datasetService.destroy(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Dataset not found',
        });
    }
    res.json(response);
}));
/**
 * Forecasts
 */
app.get('/forecasts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastService.index();
    res.json(response);
}));
app.post('/forecasts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastService.store(req.body);
    res.json(response);
}));
/**
 * Forecast Executions
 */
app.get('/forecasts/executions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastExecutionService.index();
    res.json(response);
}));
app.post('/forecasts/executions', (0, common_1.withRequestValidator)(requests_1.storeForecastExecutionRequest), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const forecast = yield services_1.forecastService.show(req.body.forecast_id);
    if (!forecast) {
        return res.status(404).json({
            message: 'Forecast not found',
        });
    }
    try {
        const response = yield services_1.forecastExecutionService.store(req.body);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * Dataset Results
 */
app.get('/forecasts/results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastResultService.index();
    res.json(response);
}));
app.get('/forecasts/results/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastResultService.show(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Result not found',
        });
    }
    res.json(response);
}));
/**
 * Forecast single resource actions
 */
app.get('/forecasts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastService.show(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Forecast not found',
        });
    }
    res.json(response);
}));
app.delete('/forecasts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield services_1.forecastService.destroy(req.params.id);
    if (!response) {
        return res.status(404).json({
            message: 'Forecast not found',
        });
    }
    res.json(response);
}));
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map