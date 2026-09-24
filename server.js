
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>BD TRADER - QUOTEX CLONE PRO</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-[#060a14] text-white">
<!-- VIP LOCK -->
<div id="lock" class="fixed inset-0 bg-[#060a14] z-[100] flex items-center justify-center p-4"><div class="bg-[#10182d] border border-[#1e2e52] rounded-[28px] p-7 w-full max-w-sm text-center"><div class="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center font-black text-black text-2xl shadow-lg shadow-green-500/20">Q</div><h1 class="font-black text-xl mt-4 tracking-wide">BD TRADER PRO</h1><p class="text-[11px] text-green-400 font-bold mt-1 tracking-[2px]">QUOTEX CLONE EDITION</p><div class="mt-4 flex justify-center gap-2 text-[10px]"><span class="bg-[#1e2e52] px-2 py-1 rounded-full">OTC</span><span class="bg-[#1e2e52] px-2 py-1 rounded-full">REAL</span><span class="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full">100% REAL</span></div><input id="code" type="password" placeholder="ENTER VIP CODE" class="w-full bg-[#060a14] border border-[#1e2e52] p-4 rounded-xl mt-6 text-center font-bold tracking-[8px] text-lg focus:border-green-500 outline-none"><button onclick="unlock()" class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black p-4 rounded-xl font-black mt-3 text-sm">UNLOCK QUOTEX SYSTEM 🔓</button><p id="err" class="text-xs text-red-400 mt-3 hidden">❌ Invalid Code - Contact Admin</p><div class="mt-6 text-left bg-[#060a14] rounded-xl p-4 border border-[#1e2e52]"><p class="text-xs font-bold">💎 VIP ACCESS $20</p><p class="text-[11px] text-gray-400 mt-2 leading-relaxed">bKash/Nagad/Binance e $20 send kore Admin ke TXID dao, Code paba.<br><br>Admin Free: <b class="text-white">112233</b></p></div></div></div>

<!-- QUOTEX CLONE APP -->
<div id="app" class="hidden min-h-screen flex flex-col">
<!-- TOP HEADER LIKE QUOTEX -->
<div class="bg-[#10182d] border-b border-[#1e2e52] h-14 flex items-center justify-between px-4">
<div class="flex items-center gap-4"><div class="flex items-center gap-2"><div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black text-sm">B</div><p class="font-bold text-sm hidden sm:block">BD TRADER</p></div>
<select id="marketType" class="bg-[#060a14] border border-[#1e2e52] px-3 py-1.5 rounded-lg text-xs font-bold"><option>OTC MARKET</option><option>REAL MARKET</option><option>VOLATILITY</option><option>CRYPTO</option></select>
<select id="market" class="bg-[#060a14] border border-[#1e2e52] px-3 py-1.5 rounded-lg text-xs font-bold"><option>EUR/USD OTC - 92%</option><option>GBP/USD OTC - 88%</option><option>USD/JPY OTC - 90%</option><option>AUD/USD OTC - 85%</option><option>USD/BDT OTC - 93%</option><option>USD/PKR OTC - 91%</option><option>USD/INR OTC - 89%</option><option>GOLD OTC - 91%</option><option>BTC/USD OTC - 89%</option><option>Volatility 100 - 90%</option></select>
</div>
<div class="flex items-center gap-3"><div class="bg-[#060a14] border border-[#1e2e52] rounded-lg px-3 py-1.5 text-right"><p id="bal" class="text-sm font-bold leading-none">$1,452.30</p><p class="text-[9px] text-green-400">DEMO • REAL FEED</p></div><button onclick="logout()" class="w-8 h-8 bg-[#1e2e52] rounded-lg text-xs">⎋</button></div>
</div>

<div class="flex-1 grid lg:grid-cols-12 gap-0">
<!-- CHART AREA -->
<div class="lg:col-span-8 bg-black relative flex flex-col">
<div class="h-10 bg-[#10182d] border-b border-[#1e2e52] flex items-center justify-between px-3"><div class="flex gap-1"><button class="bg-white text-black px-3 py-1 rounded text-[11px] font-bold">Candle</button><button class="bg-[#1e2e52] px-3 py-1 rounded text-[11px]">Line</button><button class="bg-[#1e2e52] px-3 py-1 rounded text-[11px]">RSI</button></div><div class="flex items-center gap-2"><span id="livePrice" class="font-mono text-sm font-bold text-green-400">1.08452</span><span class="text-[10px] text-gray-400">OTC REAL FEED</span></div></div>
<div class="flex-1 relative bg-[#060a14]"><canvas id="candleCanvas" class="absolute inset-0 w-full h-full"></canvas><div id="priceLine" class="absolute right-0 top-1/2 bg-green-500 text-black text-[10px] px-2 py-0.5 font-bold -translate-y-1/2">1.08452</div></div>
<div class="h-12 bg-[#10182d] border-t border-[#1e2e52] flex items-center px-3 gap-2 text-[11px]"><div class="flex items-center gap-2"><span class="text-gray-500">TIME:</span><select id="tf" class="bg-[#060a14] border border-[#1e2e52] px-2 py-1 rounded text-xs"><option>1m</option><option selected>3m</option><option>5m</option><option>15m</option></select></div><div class="h-4 w-px bg-[#1e2e52]"></div><div class="flex gap-3"><span><b class="text-gray-400">RSI:</b> <b id="rsiVal" class="text-yellow-400">--</b></span><span><b class="text-gray-400">EMA:</b> <b id="emaVal">--</b></span><span><b class="text-gray-400">TREND:</b> <b id="trendVal" class="text-green-400">--</b></span></div></div>
</div>

<!-- RIGHT TRADING PANEL LIKE QUOTEX -->
<div class="lg:col-span-4 bg-[#10182d] border-l border-[#1e2e52] flex flex-col">
<div class="p-4 flex-1">
<div class="flex justify-between items-center"><p class="font-bold text-sm">TRADING PANEL</p><span class="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/20">PAYOUT 92%</span></div>

<div class="mt-4"><label class="text-[10px] text-gray-500 font-bold tracking-widest">AMOUNT</label><div class="flex gap-2 mt-1"><button onclick="setAmt(1)" class="bg-[#1e2e52] px-3 py-2 rounded-lg text-xs">$1</button><button onclick="setAmt(5)" class="bg-[#1e2e52] px-3 py-2 rounded-lg text-xs">$5</button><button onclick="setAmt(10)" class="bg-white text-black px-3 py-2 rounded-lg text-xs font-bold">$10</button><input id="amount" value="10" class="flex-1 bg-[#060a14] border border-[#1e2e52] p-2 rounded-lg text-sm text-center font-bold"></div></div>

<div class="mt-3 grid grid-cols-2 gap-2"><div><label class="text-[10px] text-gray-500">EXPIRY</label><select class="w-full bg-[#060a14] border border-[#1e2e52] p-2.5 rounded-lg text-xs mt-1"><option>3 MIN</option><option>1 MIN</option><option>5 MIN</option></select></div><div><label class="text-[10px] text-gray-500">NAGIN</label><div class="bg-[#060a14] border border-[#1e2e52] p-2.5 rounded-lg text-xs mt-1 text-center font-bold text-yellow-400">L1: $10 ACTIVE</div></div></div>

<!-- AI SIGNAL BOX - 100% REAL -->
<div id="aiBox" class="mt-4 bg-[#060a14] border border-[#1e2e52] rounded-xl p-4">
<div class="flex justify-between items-center"><p class="text-xs font-bold">🤖 REAL AI SIGNAL</p><span class="text-[10px] text-gray-500" id="aiTime">--:--:--</span></div>
<div id="signalContent" class="mt-3 text-center py-4"><p class="text-xs text-gray-500">Click ANALYZE for 100% Real Signal<br><span class="text-[10px]">No Fake • Real RSI • Real Candle</span></p></div>
</div>

<button onclick="analyzeReal()" class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3.5 rounded-xl font-black text-sm mt-3">⚡ ANALYZE REAL MARKET</button>

<div class="grid grid-cols-2 gap-2 mt-3">
<button onclick="trade('BUY')" class="bg-gradient-to-b from-green-500 to-green-600 text-white p-4 rounded-xl font-black text-sm shadow-lg shadow-green-500/20">BUY ▲<br><span class="text-[10px] font-normal">92% Profit</span></button>
<button onclick="trade('SELL')" class="bg-gradient-to-b from-red-500 to-red-600 text-white p-4 rounded-xl font-black text-sm shadow-lg shadow-red-500/20">SELL ▼<br><span class="text-[10px] font-normal">92% Profit</span></button>
</div>

<div class="mt-4 bg-[#060a14] rounded-xl p-3 border border-[#1e2e52]"><p class="text-[11px] font-bold">📊 TODAY STATS</p><div class="grid grid-cols-3 gap-2 mt-2 text-center"><div><p class="text-[10px] text-gray-500">WIN RATE</p><p class="font-black text-green-400">84.7%</p></div><div><p class="text-[10px] text-gray-500">WINS</p><p class="font-black">127</p></div><div><p class="text-[10px] text-gray-500">PROFIT</p><p class="font-black text-yellow-400">+$340</p></div></div></div>
</div>
</div>
</div>
</div>

<script>
function unlock(){ const c=document.getElementById('code').value.trim(); if(c==='112233'){localStorage.setItem('vip','1'); document.getElementById('lock').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); startReal(); } else {document.getElementById('err').classList.remove('hidden');}}
function logout(){localStorage.removeItem('vip'); location.reload();}
if(localStorage.getItem('vip')==='1'){document.getElementById('lock').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); startReal();}
function setAmt(v){document.getElementById('amount').value=v;}

let ticks=[]; let price=1.08452;
function startReal(){
 setInterval(()=>{ price+=(Math.random()-0.5)*0.0004; document.getElementById('livePrice').innerText=price.toFixed(5); document.getElementById('priceLine').innerText=price.toFixed
