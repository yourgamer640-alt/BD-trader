const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="bn"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BD Trader AI V4</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-black text-white min-h-screen flex items-center justify-center p-4">
<div class="w-full max-w-md bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
<h1 class="text-2xl font-bold text-center">BD Trader AI 🇧🇩</h1>
<p class="text-center text-zinc-400 text-sm mb-6">চার্ট আপলোড দাও, Signal নাও</p>
<select id="market" class="w-full bg-zinc-800 p-3 rounded-xl mb-3"><option>EUR/USD</option><option>BTC/USD</option><option>GOLD</option><option>GBP/USD</option></select>
<input type="file" id="image" accept="image/*" class="w-full bg-zinc-800 p-3 rounded-xl mb-4">
<button onclick="analyze()" id="btn" class="w-full bg-green-500 text-black font-bold p-3 rounded-xl">ANALYZE</button>
<div id="result" class="mt-6 p-4 bg-zinc-800 rounded-xl hidden whitespace-pre-wrap text-sm"></div>
</div>
<script>
async function analyze(){
  const file=document.getElementById('image').files[0];
  if(!file){alert('ছবি দাও ভাই!');return;}
  const btn=document.getElementById('btn'); const resDiv=document.getElementById('result');
  btn.innerText='Analyzing...'; btn.disabled=true;
  resDiv.classList.remove('hidden'); resDiv.innerText='AI চিন্তা করছে... ১০ সেকেন্ড';
  const form=new FormData(); form.append('image',file); form.append('market',document.getElementById('market').value); form.append('timeframe','5m');
  try{
    const r=await fetch('/analyze',{method:'POST',body:form}); const data=await r.json();
    if(data.error) throw new Error(data.error); resDiv.innerText=data.result;
  }catch(e){resDiv.innerText='Error: '+e.message;}
  btn.innerText='ANALYZE'; btn.disabled=false;
}
</script></body></html>
  `);
});

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Chart image is required" });
    const base64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype || "image/jpeg";
    const market = req.body.market || "Unknown";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = \`Analyze this \${market} chart,
