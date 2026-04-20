import { Request, Response } from "express";
import { generateRequestSchema } from "../validations/ai.schema.js";
import { processPromptService, generateImageService } from "../services/ai.service.js";

export const handleGenerate = async (req: Request, res: Response) => {
  try {
    
    const validatedData = generateRequestSchema.parse(req.body);

    
    const result = await processPromptService(validatedData);

    
    res.status(200).json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res
        .status(400)
        .json({ error: "Invalid payload format", details: error.errors });
    }
    console.error("AI Generation Error:", error.message);
    res.status(500).json({ error: error.message || "Failed to process AI request." });
  }
};

export const handleGenerateImage = async (req: Request, res: Response) => {
    try {
        const { prompt, n = 1, size = "1024x1024" } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const result = await generateImageService(prompt, n, size);
        res.status(200).json(result);
    } catch (error: any) {
        console.error("Image Generation Error:", error.message);
        res.status(500).json({ error: error.message || "Failed to generate image." });
    }
};
