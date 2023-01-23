import express from "express";
import { qrGenerator } from "./src/controller/qrGenerator";
import { limiter } from "./src/middleware/rateLimit";

const app = express();

app.use(express.json(), limiter);

app.use("/qr-code", qrGenerator);

app.listen(8000, () => {
  console.log("[⚡️Server⚡️] started on port 8000");
});
