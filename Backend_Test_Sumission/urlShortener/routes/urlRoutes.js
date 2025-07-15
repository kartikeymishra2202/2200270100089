import express from "express";
import {
  createShortUrl,
  redirectToOriginal,
  getStats,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:shortcode", getStats);
router.get("/:shortcode", redirectToOriginal);

export default router;
