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
const service = () => {
    const store = (dataset) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, common_1.runCommand)('/Users/pipee/.pyenv/versions/3.10.4/bin/python3', [
            '/Users/pipee/Code/alvama/main.py',
            `${JSON.stringify(dataset)}`,
        ]);
    });
    return { store };
};
exports.alvamaService = service();
//# sourceMappingURL=alvama.service.js.map