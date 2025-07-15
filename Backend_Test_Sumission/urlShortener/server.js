import express from "express";
import bodyParser from "body-parser";

import urlRoutes from "./routes/urlRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/", urlRoutes);

app.use(requestLogger);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
