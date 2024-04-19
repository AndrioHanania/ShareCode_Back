import express from "express";
import { codeDB } from "../db/codeDB";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const codeBlocks: { id: string; name: string }[] = codeDB.map((c) => ({
      id: c.id,
      name: c.name,
    }));
    return res.status(200).json(codeBlocks);
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    res.status(500).json({ error: "Error fetching code blocks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const codeBlock = codeDB.find((c) => c.id === req.params.id);
    if (!codeBlock) {
      return res.status(404).json({ error: "Code block not found" });
    }
    res.status(200).json(codeBlock);
  } catch (error) {
    console.error("Error fetching code block:", error);
    res.status(500).json({ error: "Error fetching code block" });
  }
});

export default router;
