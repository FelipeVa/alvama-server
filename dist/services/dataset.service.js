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
exports.datasetService = void 0;
const prisma_1 = require("../utils/prisma");
const service = () => {
    const index = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.dataset.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                routes: true,
                buses: {
                    include: {
                        capacities: true,
                    },
                },
            },
        });
    });
    const store = (dataset) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.dataset.create({
            data: {
                name: dataset.name,
                routes: {
                    create: dataset.routes,
                },
                buses: {
                    create: dataset.buses.map(bus => (Object.assign(Object.assign({}, bus), { capacities: {
                            create: bus.capacities,
                        } }))),
                },
            },
            include: {
                routes: true,
                buses: {
                    include: {
                        capacities: true,
                    },
                },
            },
        });
    });
    const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.dataset.delete({
            where: {
                id: parseInt(id),
            },
        });
    });
    const show = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.dataset.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                routes: true,
                buses: {
                    include: {
                        capacities: true,
                    },
                },
            },
        });
    });
    const showForAlvama = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.prisma.dataset.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                routes: {
                    select: {
                        id: true,
                        length: true,
                        cycle_time: true,
                        demand: true,
                    },
                },
                buses: {
                    select: {
                        id: true,
                        cost_per_km: true,
                        capacities: {
                            select: {
                                id: true,
                                available: true,
                                capacity: true,
                            },
                        },
                    },
                },
            },
        });
    });
    return { index, store, destroy, show, showForAlvama };
};
exports.datasetService = service();
//# sourceMappingURL=dataset.service.js.map