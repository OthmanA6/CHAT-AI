import { z } from "zod";

export const generateRequestSchema = z.object({
  model: z.string().default("gpt-4o-mini"), // Map frontend pseudo-models to actual OpenAI models
  conversation: z.string().optional(),
  input: z.union([
    z.string(),
    z.array(
      z.object({
        role: z.string(),
        content: z.array(
          z.object({
            type: z.string(),
            text: z.string().optional(),
            image_url: z.string().optional(),
            file_url: z.string().optional(),
          }),
        ),
      }),
    ),
  ]),
});
