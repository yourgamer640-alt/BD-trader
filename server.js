
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(cors()); app.use(express.json());
const upload = multer();

app.get('/', (req,res)=>{
res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>BD TRADER PRO MAX</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-[#0a0a0a] text-white p-2">
<div class="max-w-md mx-auto">
<div class="bg-zinc-900 rounded-2xl p-4 mt-2 border border-zinc-800">
<div class="flex justify-between items-center mb-4"><h1 class="font-black text-green-400 text-lg">BD TRADER PRO MAX</h1><span class="bg-green-900 text-green-300 text-xs px-2 py-1 rounded-full">● LIVE</span></div>

<div class="grid grid-cols-3 gap-2 mb-4 text-center">
<div class="bg-black p-2 rounded-xl"><p class="text-xs text-gray-500">WIN</p><p id="win" class="font-bold text-green-400">0</p></div>
<div class="bg-black p-2 rounded-xl"><p class="text-xs text-gray-500">LOSS</p><p id="loss" class="font-bold text-red-500">0</p></div>
<div class="bg-black p-2 rounded-xl"><p class="text-xs text-gray-500">ACCURACY</p><p id="acc" class="font-bold text-yellow-400">95%</p></div>
</div>

<label class="text-[11px] text-gray-500 font-bold">MARKET (ALL OTC)</label>
<select id="market" class="w-full bg-black p-3 rounded-xl mb-3 border border-zinc-700 text-sm">
<option>EUR/USD OTC</option><option>GBP/USD OTC</option><option>USD/JPY OTC</option><option>AUD/USD OTC</option><option>USD/CAD OTC</option><option>USD/CHF OTC</option><option>NZD/USD OTC</option><option>EUR/JPY OTC</option><option>GBP/JPY OTC</option><option>AUD/JPY OTC</option><option>NZD/JPY OTC</option><option>CAD/JPY OTC</option><option>CHF/JPY OTC</option><option>EUR/GBP OTC</option><option>EUR/CHF OTC</option><option>EUR/AUD OTC</option><option>EUR/CAD OTC</option><option>EUR/NZD OTC</option><option>GBP/AUD OTC</option><option>GBP/CAD OTC</option><option>GBP/CHF OTC</option><option>GBP/NZD OTC</option><option>AUD/CAD OTC</option><option>AUD/CHF OTC</option><option>AUD/NZD OTC</option><option>USD/BDT OTC</option><option>USD/PKR OTC</option><option>USD/INR OTC</option><option>USD/BRL OTC</option><option>USD/NGN OTC</option><option>USD/EGP OTC</option><option>USD/MXN OTC</option><option>BTC/USD OTC</option><option>ETH/USD OTC</option><option>GOLD OTC</option><option>SILVER OTC</option><option>USCrude OTC</option>
</select>

<div class="grid grid-cols-2 gap-2 mb-3">
<div><label class="text-[11px] text-gray-500 font-bold">TIMEFRAME</label><select id="tf" class="w-full bg-black p-3 rounded-xl border border-zinc-700 text-sm"><option>1 MIN</option><option>2 MIN</option><option selected>3 MIN</option><option>5 MIN</option><option>15 MIN</option></select></div>
<div><label class="text-[11px] text-gray-500 font-bold">EXPIRY</label><select id="ex" class="w-full bg-black p-3 rounded-xl border border-zinc-700 text-sm"><option>1 MIN</option><option>2 MIN</option><option>3 MIN</option><option selected>5 MIN</option></select></div>
</div>

<input type="file" id="image" class="w-full bg-black p-3 rounded-xl mb-3 border border-zinc-700 text-sm" accept="image/*">
<button onclick="analyze()" id="btn" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl font-black text-black text-lg">🚀 GENERATE SIGNAL</button>

<div id="result" class="mt-4 hidden"></div>
<div id="history" class="mt-4"><p class="text-xs text-gray-500 font-bold mb-2">LAST SIGNALS</p><div id="histList" class="space-y-2 text-sm"></div></div>
</div></div>

<script>
let wins=parseInt(localStorage.getItem('wins')||0); let losses=parseInt(localStorage.getItem('losses')||0);
document.getElementById('win').innerText=wins; document.getElementById('loss').innerText=losses;
function updateHist(){ const h=JSON.parse(localStorage.getItem('hist')||'[]'); document.getElementById('histList').innerHTML=h.slice(0,5).map(x=>'<div class="flex justify-between bg-black p-2 rounded-lg border border-zinc-800"><span>'+x.market+'</span><span class="'+(x.signal=='BUY'?'text-green-400':'text-red-500')+' font-bold">'+x.signal+'</span><span class="text-gray-500 text-xs">'+x.time+'</span></div>').join(''); }
updateHist();
async function analyze(){
const market=document.getElementById('market').value; const tf=document.getElementById('tf').value; const ex=document.getElementById('ex').value;
const file=document.getElementById('image').files[0]; const resDiv=document.getElementById('result');
if(!file){alert('Chart er Screenshot dao!');return;}
resDiv.classList.remove('hidden'); resDiv.innerHTML='<div class="bg-black p-4 rounded-xl text-center animate-pulse border border-zinc-700">AI Analyzing '+market+'...<br><span class="text-xs text-gray-400">'+tf+' Timeframe</span></div>';
const form=new FormData(); form.append('market',market); form.append('tf',tf); form.append('ex',ex); form.append('image',file);
const r=await fetch('/analyze',{method:'POST',body:form}); const d=await r.json();
let sec=10; resDiv.innerHTML='<div class="bg-black p-4 rounded-xl border border-zinc-700 text-center"><p class="text-xs text-gray-400">'+d.market+' | '+d.tf+'</p><p class="text-5xl font-black mt-2 '+(d.signal=='BUY'?'text-green-400':'text-red-500')+'">'+d.signal+'</p><p class="mt-2 text-sm">Strength: <b class="text-yellow-400">'+d.strength+'</b> | Accuracy: <b>'+d.accuracy+'%</b></p><div class="grid grid-cols-2 gap-2 mt-3 text-left text-sm bg-zinc-900 p-3 rounded-xl"><div>⏱️ ENTRY: <b id="timer">'+sec+'s</b></div><div>⏳ EXPIRY: <b>'+d.ex+'</b></div><div>📈 TIME: <b>'+d.entryTime+'</b></div><div>🔥 CONFIDENCE: <b>'+d.accuracy+'%</b></div></div><p class="text-left text-xs mt-3 bg-zinc-900 p-3 rounded-xl">'+d.reason+'</p><button onclick="navigator.clipboard.writeText(\''+d.signal+' - '+market+'\');alert('Copied!')" class="w-full mt-3 bg-zinc-800 p-2 rounded-lg text-sm">📋 COPY SIGNAL</button><div class="grid grid-cols-2 gap-2 mt-2"><button onclick="markWin()" class="bg-green-900 p-2 rounded-lg text-sm">WIN ✓</button><button onclick="markLoss()" class="bg-red-900 p-2 rounded-lg text-sm">LOSS ✗</button></div></div>';
let iv=setInterval(()=>{ sec--; const el=document.getElementById('timer'); if(el) el.innerText=sec+'s'; if(sec<=0){ clearInterval(iv); if(el) el.innerText='TAKE NOW!'; } },1000);
let h=JSON.parse(localStorage.getItem('hist')||'[]'); h.unshift({market:market,signal:d.signal,time:d.entryTime}); localStorage.setItem('hist',JSON.stringify(h.slice(0,20))); updateHist();
}
function markWin(){ wins++; localStorage.setItem('wins',wins); document.getElementById('win').innerText=wins; }
function markLoss(){ losses++; localStorage.setItem('losses',losses); document.getElementById('loss').innerText=losses; }
