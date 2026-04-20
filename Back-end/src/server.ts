import "dotenv/config";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", aiRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running cleanly on http://localhost:${PORT}`);
});
