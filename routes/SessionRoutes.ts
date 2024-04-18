import express from "express";
import { codeDB } from "../db/codeDB";
import { sessionDB } from "../db/sessionDB";

const router = express.Router();

router.get("/:sessionId", async (req, res) => {
  try {
    const session = sessionDB.find((s) => {
      console.log("s: " + s.id);
      if (s.id === req.params.sessionId) return s;
    });

    if (session) {
      res.status(200).json({ codeBlockId: session.codeBlockId });
    } else {
      return res.status(404).json({ error: "sessionId not found" });
    }
  } catch (error) {
    console.error("Error fetching codeBlockId:", error);
    res.status(500).json({ error: "Error fetching codeBlockId" });
  }
});

export default router;
