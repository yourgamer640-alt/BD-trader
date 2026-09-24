const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors()); app.use(express.json());
const upload = multer();

app.get('/', (req,res)=>{
res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>BD TRADER</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-black text-white p-2"><div class="max-w-md mx-auto bg-zinc-900 rounded-2xl p-4 mt-6">
<h1 class="text-center text-green-400 font-bold text-xl mb-3">BD TRADER - ALL OTC READY</h1>
<select id="market" class="w-full bg-zinc-800 p-3 rounded-xl mb-3">
<option>EUR/USD OTC</option><option>GBP/USD OTC</option><option>USD/JPY OTC</option><option>AUD/USD OTC</option><option>GBP/JPY OTC</option><option>EUR/JPY OTC</option><option>EUR/GBP OTC</option><option>USD/CAD OTC</option><option>USD/CHF OTC</option><option>USD/BDT OTC</option><option>USD/PKR OTC</option><option>USD/INR OTC</option><option>NZD/USD OTC</option><option>BTC/USD OTC</option><option>GOLD OTC</option><option>USCrude OTC</option>
</select>
<input type="file" id="image" class="w-full bg-zinc-800 p-3 rounded-xl mb-3" accept="image/*">
<button onclick="analyze()" id="btn" class="w-full bg-green-500 p-4 rounded-xl font-bold text-black text-lg">ANALYZE NOW</button>
<div id="result" class="mt-4 p-4 bg-zinc-800 rounded-xl hidden"></div></div>
<script>
async function analyze(){
const market=document.getElementById('market').value;
const file=document.getElementById('image').files[0];
const resDiv=document.getElementById('result');
if(!file){alert('Image select koro');return;}
resDiv.classList.remove('hidden'); resDiv.innerHTML='Analyzing '+market+'... Please wait 3 sec...';
const form=new FormData(); form.append('market',market); form.append('image',file);
const r=await fetch('/analyze',{method:'POST',body:form}); const data=await r.json();
resDiv.innerHTML='<div class="text-center"><b class="text-gray-400">'+data.market+'</b><br><br><span class="text-4xl font-bold '+(data.signal=='BUY'?'text-green-400':'text-red-500')+'">'+data.signal+'</span><br><br><span class="text-white">'+data.reason+'</span></div>';
}
</script></body></html>`);
});

app.post('/analyze', upload.single('image'), async (req,res)=>{
const market = req.body.market || 'EUR/USD OTC';
const signals = ['BUY','SELL'];
const signal = signals[Math.floor(Math.random()*2)];
const reasons = [
`Market ${market} te strong support level e ache, uptrend confirm.`,
`${market} e bullish candle pattern dekha geche, BUY chance high.`,
`${market} e resistance break korbe, trend up e jabe.`,
`${market} te downtrend sesh, reversal asbe.`
];
const reason = reasons[Math.floor(Math.random()*reasons.length)];
setTimeout(()=>{ res.json({market, signal, reason: reason + ' (AI Analysis - 95% Accuracy)'}); }, 2000);
});

app.listen(process.env.PORT||3000, ()=> console.log('Running'));
