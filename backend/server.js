import express from "express";
import cors from "cors";
import predictionRoutes from "./routes/prediction.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/predict", predictionRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});