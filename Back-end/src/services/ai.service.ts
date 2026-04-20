import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processPromptService = async (payload: any) => {
  let messages: any[] = [];

  // Handle standard text generation (
  if (typeof payload.input === "string") {
    messages.push({ role: "user", content: payload.input });
  }
  //  Handle Multimodal Arrays 
  else if (Array.isArray(payload.input)) {
    for (const message of payload.input) {
      let formattedContent: any[] = [];

      for (const item of message.content) {
        if (item.type === "input_text") {
          formattedContent.push({ type: "text", text: item.text });
        } else if (item.type === "input_image") {
          const fs = await import("fs/promises");
          const path = await import("path");
          const filename = path.basename(item.image_url);
          const filePath = path.join(process.cwd(), "uploads", filename);
          const imageBuffer = await fs.readFile(filePath);
          const base64Image = imageBuffer.toString("base64");
          const mimeType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

          formattedContent.push({
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${base64Image}` },
          });
        } else if (item.type === "input_file") {
          // Read PDF directly from local disk instead of URL to avoid localhost issues
          const fs = await import("fs/promises");
          const path = await import("path");
          
          const filename = path.basename(item.file_url);
          const filePath = path.join(process.cwd(), "uploads", filename);
          const fileBuffer = await fs.readFile(filePath);
          
          const { PDFParse } = await import("pdf-parse");
          const pdf = new PDFParse(new Uint8Array(fileBuffer));
          const pdfData = await pdf.getText();
          
          formattedContent.push({
            type: "text",
            text: `[Extracted Document Content]:\n${pdfData}`,
          });
        }
      }
      messages.push({ role: message.role, content: formattedContent });
    }
  }

  
  const actualModel = payload.model.includes("gpt-4o-mini")
    ? "gpt-4o-mini"
    : payload.model;

  const response = await openai.chat.completions.create({
    model: actualModel,
    messages: messages,
  });

  return {
    success: true,
    data: response.choices[0]?.message?.content ?? "",
    conversation: payload.conversation,
  };
};

export const generateImageService = async (prompt: string, n: number, size: string) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-2", 
            prompt: prompt,
            n: Math.min(n, 1), 
            size: "1024x1024",
        });

        return {
            success: true,
            data: response.data.map(img => img.url)
        };
    } catch (error: any) {
        console.error("OpenAI Image Gen Service Error:", error.response?.data || error.message);
        throw error;
    }
};


