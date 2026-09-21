import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictWinner = (req, res) => {
  const {
    team1,
    team2,
    venue,
    tossWinner,
    tossDecision,
  } = req.body;

  if (
    !team1 ||
    !team2 ||
    !venue ||
    !tossWinner ||
    !tossDecision
  ) {
    return res.status(400).json({
      error: "All prediction fields are required.",
    });
  }

  const predictorPath = path.join(
    __dirname,
    "../ml/predictor.py"
  );

  const python = spawn("python", [
    predictorPath,
  ]);

  const inputData = JSON.stringify({
    team1,
    team2,
    venue,
    toss_winner: tossWinner,
    toss_decision: tossDecision,
  });

  let output = "";
  let errorOutput = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      console.error("Python error:", errorOutput);

      return res.status(500).json({
        error: "Prediction model failed.",
        details: errorOutput,
      });
    }

    try {
      const result = JSON.parse(output);

      res.json(result);
    } catch (error) {
      console.error("Invalid Python output:", output);

      res.status(500).json({
        error: "Invalid prediction response.",
      });
    }
  });

  python.stdin.write(inputData);
  python.stdin.end();
};