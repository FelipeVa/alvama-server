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
exports.resultService = void 0;
const prisma_1 = require("../utils/prisma");
const service = () => {
    const index = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.result.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                execution: true,
                result_items: {
                    include: {
                        bus: true,
                        route: true,
                        capacity: true,
                    },
                },
            },
        });
    });
    const show = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.result.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                execution: true,
                dataset: {
                    include: {
                        buses: true,
                    },
                },
                result_items: {
                    include: {
                        bus: true,
                        route: true,
                        capacity: true,
                    },
                },
            },
        });
    });
    const store = (datasetId, results) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.result.create({
            data: {
                dataset_id: parseInt(datasetId),
                objective: results.objective,
                time: results.time,
                status: results.status,
                result_items: {
                    create: results.results.map(result_item => ({
                        value: String(result_item.amount),
                        bus_id: parseInt(result_item.bus_id),
                        route_id: parseInt(result_item.route_id),
                        bus_capacity_id: parseInt(result_item.capacity_id),
                    })),
                },
            },
            include: {
                result_items: true,
            },
        });
    });
    return { store, index, show };
};
exports.resultService = service();
//# sourceMappingURL=result.service.js.map