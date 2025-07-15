import { Url } from "../models/urlModel.js";
import { generateShortcode } from "../utils/generateShortCode.js";
import { isValidUrl } from "../utils/validateUrl.js";
import moment from "moment";
import { Log } from "../../../LoggingMiddleware/logger.js";

export async function createShortUrl(req, res) {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || !isValidUrl(url)) {
      await Log("backend", "error", "controller", "Invalid or missing URL");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = shortcode || generateShortcode();

    if (!/^[a-zA-Z0-9]{4,10}$/.test(code)) {
      await Log("backend", "warn", "controller", "Shortcode format invalid");
      return res.status(400).json({ error: "Invalid shortcode format" });
    }

    const exists = await Url.findOne({ shortcode: code });
    if (exists) {
      await Log("backend", "error", "controller", "Shortcode already exists");
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const expiry = moment().add(validity, "minutes").toDate();

    const newEntry = await Url.create({
      shortcode: code,
      url,
      expiry,
    });

    await Log(
      "backend",
      "info",
      "controller",
      `Short URL created for ${url} with code ${code}`
    );
    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get("host")}/${code}`,
      expiry: newEntry.expiry.toISOString(),
    });
  } catch (err) {
    await Log("backend", "fatal", "controller", "Failed to create short URL");
    return res.status(500).json({ error: "Server Error" });
  }
}

export async function redirectToOriginal(req, res) {
  try {
    const { shortcode } = req.params;
    const entry = await Url.findOne({ shortcode });

    if (!entry) {
      await Log("backend", "error", "handler", "Shortcode not found");
      return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date(entry.expiry) < new Date()) {
      await Log("backend", "warn", "handler", "Shortcode expired");
      return res.status(410).json({ error: "Shortcode expired" });
    }

    entry.hitCount += 1;
    await entry.save();

    await Log(
      "backend",
      "info",
      "handler",
      `Redirecting to original URL for code ${shortcode}`
    );
    return res.redirect(entry.url);
  } catch (err) {
    await Log("backend", "fatal", "handler", "Failed to redirect");
    return res.status(500).json({ error: "Server Error" });
  }
}

export async function getStats(req, res) {
  try {
    const { shortcode } = req.params;
    const entry = await Url.findOne({ shortcode });

    if (!entry) {
      await Log(
        "backend",
        "error",
        "controller",
        "Stats requested for non-existent shortcode"
      );
      return res.status(404).json({ error: "Shortcode not found" });
    }

    return res.json({
      url: entry.url,
      expiry: entry.expiry.toISOString(),
      hits: entry.hitCount,
    });
  } catch (err) {
    await Log("backend", "fatal", "controller", "Failed to fetch stats");
    return res.status(500).json({ error: "Server Error" });
  }
}
