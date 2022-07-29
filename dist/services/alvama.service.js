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
Object.defineProperty(exports, "__esModule", { value: true });
exports.alvamaService = void 0;
const common_1 = require("../utils/common");
const dataset_service_1 = require("./dataset.service");
const forecast_service_1 = require("./forecast.service");
const service = () => {
    const runModel = (datasetId) => __awaiter(void 0, void 0, void 0, function* () {
        const dataset = yield dataset_service_1.datasetService.showForAlvama(datasetId);
        return yield (0, common_1.runCommand)(process.env.ALVAMA_BINARY, [
            'alvama',
            `${JSON.stringify(dataset)}`,
        ]);
    });
    const runForecast = (forecastId) => __awaiter(void 0, void 0, void 0, function* () {
        const forecast = yield forecast_service_1.forecastService.showForAlvama(forecastId);
        return yield (0, common_1.runCommand)(process.env.ALVAMA_BINARY, [
            'forecast',
            `${JSON.stringify(forecast)}`,
        ]);
    });
    return { runModel, runForecast };
};
exports.alvamaService = service();
//# sourceMappingURL=alvama.service.js.map