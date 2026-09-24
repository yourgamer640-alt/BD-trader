const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const app = express();
app.use(cors()); app.use(express.json());
const upload = multer();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req,res)=>{
res.send(`
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BD TRADER</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-black text-white p-4"><div class="max-w-md mx-auto bg-zinc-900 rounded-2xl p-5">
<h1 class="text-center text-green-400 font-bold text-xl mb-4">BD TRADER ALL OTC</h1>
<select id="market" class="w-full bg-zinc-800 p-3 rounded-xl mb-4">
<option>EUR/USD OTC</option><option>GBP/USD OTC</option><option>USD/JPY OTC</option><option>AUD/USD OTC</option>
<option>GBP/JPY OTC</option><option>EUR/JPY OTC</option><option>EUR/GBP OTC</option><option>EUR/CHF OTC</option>
<option>EUR/CAD OTC</option><option>EUR/AUD OTC</option><option>AUD/JPY OTC</option><option>AUD/CAD OTC</option>
<option>AUD/CHF OTC</option><option>AUD/NZD OTC</option><option>GBP/AUD OTC</option><option>GBP/CAD OTC</option>
<option>GBP/CHF OTC</option><option>NZD/USD OTC</option><option>NZD/JPY OTC</option><option>USD/CAD OTC</option>
<option>USD/CHF OTC</option><option>USD/BDT OTC</option><option>USD/PKR OTC</option><option>USD/INR OTC</option>
<option>USD/NGN OTC</option><option>USD/PHP OTC</option><option>USD/ZAR OTC</option><option>BTC/USD OTC</option>
<option>ETH/USD OTC</option><option>GOLD OTC</option><option>USCrude OTC</option><option>UKBrent OTC</option>
<option>EUR/USD</option><option>GBP/USD</option><option>BTC/USD</option><option>GOLD</option>
</select>
<input type="file" id="image" class="w-full bg-zinc-800 p-3 rounded-xl mb-4" accept="image/*">
<button onclick="analyze()" id="btn" class="w-full bg-green-600 p-3 rounded-xl font-bold text-black">ANALYZE</button>
<div id="result" class="mt-4 p-4 bg-zinc-800 rounded-xl hidden"></div></div>
<script>
async function analyze(){
const market=document.getElementById('market').value;
const file=document.getElementById('image').files[0];
const resDiv=document.getElementById('result');
if(!file){alert('Image select koro');return;}
resDiv.classList.remove('hidden'); resDiv.innerText='Analyzing '+market+'...';
const form=new FormData(); form.append('market',market); form.append('image',file);
const r=await fetch('/analyze',{method:'POST',body:form}); const data=await r.json();
resDiv.innerHTML='<b>'+market+'</b><br><br><span class="text-2xl text-green-400">'+data.signal+'</span><br><br>'+data.reason;
}
</script></body></html>`);
});

app.post('/analyze', upload.single('image'), async (req,res)=>{
try{
const market=req.body.market; const image=req.file;
const model=genAI.getGenerativeModel({model:'gemini-1.5-flash'});
const result=await model.generateContent([`Analyze chart for ${market} give BUY/SELL`,{inlineData:{data:image.buffer.toString('base64'),mimeType:image.mimetype}}]);
const text=result.response.text(); let signal='BUY'; if(text.toUpperCase().includes('SELL')) signal='SELL';
res.json({signal,reason:text});
}catch(e){res.json({signal:'BUY',reason:'Error: '+e.message});}
});
app.listen(process.env.PORT||3000);
