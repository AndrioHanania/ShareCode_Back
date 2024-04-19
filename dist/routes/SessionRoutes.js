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
const sessionDB_1 = require("../db/sessionDB");
const router = express_1.default.Router();
router.get("/:sessionId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = sessionDB_1.sessionDB.find((s) => {
            console.log("s: " + s.id);
            if (s.id === req.params.sessionId)
                return s;
        });
        if (session) {
            res.status(200).json({ codeBlockId: session.codeBlockId });
        }
        else {
            return res.status(404).json({ error: "sessionId not found" });
        }
    }
    catch (error) {
        console.error("Error fetching codeBlockId:", error);
        res.status(500).json({ error: "Error fetching codeBlockId" });
    }
}));
exports.default = router;
