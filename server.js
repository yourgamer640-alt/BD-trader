const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }
});

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

app.get("/", (req, res) => {
  res.json({ ok: true, service: "BD Trader AI V4" });
});

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Chart image is required" });
    }
    const base64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype || "image/jpeg";
    const market = req.body.market || "Unknown";
    const timeframe = req.body.timeframe || "Unknown";

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      input: [{
        role: "user",
        content: [
          { type: "input_text", text: `Analyze chart. Market:${market} Timeframe:${timeframe} Return JSON: signal, confidence, trend, support_resistance, candlestick, momentum, volatility, reasons, no_trade_reason` },
          { type: "input_image", image_url: `data:${mimeType};base64,${base64}`, detail: "high" }
        ]
      }]
    });

    const text = response.output_text;
    const result = JSON.parse(text);
    res.json(result);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

