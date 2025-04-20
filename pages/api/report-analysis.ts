import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({ uploadDir: "./public/uploads", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "File upload failed" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const ext = path.extname(file.originalFilename || "").toLowerCase();

    try {
      let extractedText = "";

      if (ext === ".pdf") {
        const buffer = fs.readFileSync(file.filepath);
        const parsed = await pdfParse(buffer);
        extractedText = parsed.text;
      } else if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        const result = await Tesseract.recognize(file.filepath, "eng");
        extractedText = result.data.text;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      const summary = analyzeText(extractedText);
      return res.status(200).json({ summary });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  });
}

function analyzeText(text: string): string {
    const findings: string[] = [];
  
    // Convert to uppercase to catch both L and l
    const upperText = text.toUpperCase();
  
    // Check for low or high markers (common in lab reports)
    if (upperText.includes(" L ")) findings.push("⚠️ Low values detected.");
    if (upperText.includes(" H ")) findings.push("⚠️ High values detected.");
  
    // Check specific blood components
    if (upperText.includes("LYMPHOCYTE") && upperText.includes(" L")) {
      findings.push("🩸 Lymphocyte count is low — may indicate viral infection or stress.");
    }
    if (upperText.includes("MONOCYTES") && upperText.includes(" L")) {
      findings.push("🧬 Monocyte level is low — can relate to bone marrow issues.");
    }
    if (upperText.includes("MCHC") && upperText.includes(" H")) {
      findings.push("💉 MCHC is high — possibly due to spherocytosis or dehydration.");
    }
  
    if (findings.length === 0) {
      return "📝 No abnormalities flagged in the report text.";
    }
  
    return findings.join("\n");
  }
  
