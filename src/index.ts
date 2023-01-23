import express from "express";
import qrcode from "qrcode";
import { limiter } from "./middleware/rateLimit";

const app = express();

app.use(express.json(), limiter);

app.get("/qr-code", async (req, res) => {
  const { url } = req.query as { url: string };
  const fileName = url.split("?")[0].split("/").pop();
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" parameter' });
  }

  try {
    const qrCode = await qrcode.toBuffer(url, {
      width: 400,
      margin: 1,
      color: { dark: "#102059", light: "#EDEDF0" },
      type: "png",
      maskPattern: 7,
      scale: 8,
      version: 2,
    });
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}.png"`
    );
    return res.status(200).end(qrCode, "binary");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
});

app.listen(3000, () => {
  console.log("[⚡️Server⚡️] started on port 3000");
});
