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
exports.executionService = void 0;
const prisma_1 = require("../utils/prisma");
const result_service_1 = require("./result.service");
const alvama_service_1 = require("./alvama.service");
const service = () => {
    const index = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.execution.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                dataset: true,
                result: true,
            },
        });
    });
    const store = ({ dataset_id, name }) => __awaiter(void 0, void 0, void 0, function* () {
        const alvama = yield alvama_service_1.alvamaService.store(dataset_id);
        const result = yield result_service_1.resultService.store(dataset_id, alvama);
        return yield prisma_1.prisma.execution.create({
            data: {
                name,
                dataset_id: parseInt(dataset_id),
                result_id: result.id,
            },
        });
    });
    return { store, index };
};
exports.executionService = service();
//# sourceMappingURL=execution.service.js.map