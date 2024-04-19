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
const codeDB_1 = require("../db/codeDB");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlocks = codeDB_1.codeDB.map((c) => ({
            id: c.id,
            name: c.name,
        }));
        return res.status(200).json(codeBlocks);
    }
    catch (error) {
        console.error("Error fetching code blocks:", error);
        res.status(500).json({ error: "Error fetching code blocks" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = codeDB_1.codeDB.find((c) => c.id === req.params.id);
        if (!codeBlock) {
            return res.status(404).json({ error: "Code block not found" });
        }
        res.status(200).json(codeBlock);
    }
    catch (error) {
        console.error("Error fetching code block:", error);
        res.status(500).json({ error: "Error fetching code block" });
    }
}));
exports.default = router;
