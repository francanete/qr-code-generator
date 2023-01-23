import { Request, Response } from "express";
import qrcode from "qrcode";

export const qrGenerator = async (req: Request, res: Response) => {
  const { url } = req.query as { url: string };

  const urlLength = url.replace(/[-/]/g, "").length;

  let version = 0;

  if (urlLength > 250) {
    version = 10;
  } else if (urlLength > 200) {
    version = 8;
  } else if (urlLength > 150) {
    version = 6;
  } else {
    version = 5;
  }

  const fileName = url.split("?")[0].split("/").pop();
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" parameter' });
  }

  try {
    const qrCode = await qrcode.toBuffer(url, {
      version,
      width: 400,
      margin: 1,
      color: { dark: "#102059", light: "#EDEDF0" },
      type: "png",
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
};
