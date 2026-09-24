const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

// এখানে Paid User দের Code থাকবে, তুমি add করবা
const PAID_CODES = ["BD2026", "VIP123", "TRADER20", "112233"]; // 112233 হলো তোমার Master Admin Code
const ADMIN_CODE = "112233";

app.get('/', (req,res)=>{
res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>BD TRADER PRO - VIP ACCESS</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-[#0f1218] text-white">
<!-- LOGIN LOCK SCREEN -->
<div id="lockScreen" class="fixed inset-0 bg-[#0f1218] z-[999] flex items-center justify-center p-4">
<div class="bg-[#1a1f2e] border border-[#2a3441] rounded-[24px] p-6 w-full max-w-sm">
<div class="text-center mb-6"><div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto font-black text-black text-2xl">B</div><h1 class="font-black text-xl mt-3">BD TRADER PRO</h1><p class="text-xs text-gray-400 mt-1">VIP ACCESS ONLY</p><div class="mt-3 inline-flex bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] px-3 py-1 rounded-full">🔒 $20 Deposit Required</div></div>
<div id="loginBox">
<label class="text-[11px] font-bold text-gray-400 tracking-widest">ENTER ACCESS CODE</label>
<input id="codeInput" type="password" placeholder="Enter your VIP code" class="w-full bg-[#0f1218] border border-[#2a3441] p-4 rounded-xl mt-2 text-center text-lg tracking-widest font-bold focus:border-green-500 outline-none">
<button onclick="checkCode()" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black p-4 rounded-xl font-black mt-3">UNLOCK APP 🔓</button>
<p id="codeError" class="text-xs text-red-400 mt-2 hidden text-center">❌ Wrong Code! Contact Admin</p>
</div>
<div class="mt-6 bg-[#0f1218] rounded-xl p-4 border border-[#2a3441]">
<p class="text-xs font-bold">💰 HOW TO GET CODE? - $20 ONLY</p>
<div class="text-[11px] text-gray-400 mt-2 leading-relaxed">
1. Send <b class="text-white">$20</b> via Binance / bKash / Nagad<br>
2. Send Transaction ID to Admin Telegram<br>
3. Admin will give you VIP Code<br>
4. Enter code above to unlock
</div>
<div class="grid grid-cols-2 gap-2 mt-3">
<a href="https://t.me/" target="_blank" class="bg-[#2a3441] p-2.5 rounded-lg text-center text-xs font-bold">📲 CONTACT ADMIN</a>
<div class="bg-[#1a1f2e] border border-dashed border-gray-600 p-2.5 rounded-lg text-center text-[10px]">bKash: 01XXXXXXXXX<br>Binance ID: 123456</div>
</div>
<p class="text-[10px] text-gray-500 mt-3 text-center">Admin Free Code: 112233 (Only for you)</p>
</div>
</div>
</div>

<!-- MAIN APP (HIDDEN) -->
<div id="mainApp" class="hidden">
<div class="bg-[#1a1f2e] p-3 flex justify-between items-center border-b border-[#2a3441]"><div class="flex gap-2 items-center"><div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">B</div><div><p class="font-bold text-sm">BD TRADER PRO</p><p class="text-[10px] text-green-400">VIP MEMBER ✓</p></div></div><button onclick="logout()" class="text-[10px] bg-[#0f1218] border border-[#2a3441] px-3 py-1.5 rounded-full">LOGOUT</button></div>
<div class="max-w-md mx-auto p-3">
<div class="bg-[#1a1f2e] rounded-2xl p-3 border border-[#2a3441] mb-3 flex justify-between text-xs"><span>EUR/USD OTC <span class="text-green-400">92% Payout</span></span><span id="lp">1.08452</span></div>
<div class="bg-[#1a1f2e] rounded-2xl border border-[#2a3441] p-4">
<select id="market" class="w-full bg-[#0f1218] border border-[#2a3441] p-3 rounded-xl mb-2 text-sm"><option>EUR/USD OTC</option><option>GBP/USD OTC</option><option>USD/JPY OTC</option><option>GOLD OTC</option><option>BTC/USD OTC</option><option>USD/BDT OTC</option></select>
<div class="grid grid-cols-2 gap-2 mb-2"><select id="tf" class="bg-[#0f1218] border border-[#2a3441] p-3 rounded-xl text-xs"><option>1 MIN</option><option selected>3 MIN</option><option>5 MIN</option></select><select id="ex" class="bg-[#0f1218] border border-[#2a3441] p-3 rounded-xl text-xs"><option>1 MIN</option><option selected>3 MIN</option><option>5 MIN</option></select></div>
<input type="file" id="img" class="w-full bg-[#0f1218] border border-[#2a3441] p-3 rounded-xl mb-2 text-xs" accept="image/*">
<textarea id="tele" class="w-full bg-[#0f1218] border border-[#2a3441] p-3 rounded-xl mb-2 text-xs h-16" placeholder="Telegram signal paste (optional)"></textarea>
<button onclick="go()" class="w-full bg-green-500 text-black p-4 rounded-xl font-black">GENERATE VIP SIGNAL</button>
<div id="res" class="mt-3 hidden"></div>
</div>
</div>
</div>

<script>
const ADMIN = "112233";
if(localStorage.getItem("vip_access")==="true"){document.getElementById("lockScreen").classList.add("hidden");document.getElementById("mainApp").classList.remove("hidden");}
async function checkCode(){
 const c=document.getElementById("codeInput").value.trim();
 if(!c){alert("Code dao");return;}
 const r=await fetch("/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:c})});
 const d=await r.json();
 if(d.ok){localStorage.setItem("vip_access","true");localStorage.setItem("my_code",c);document.getElementById("lockScreen").classList.add("hidden");document.getElementById("mainApp").classList.remove("hidden");}
 else{document.getElementById("codeError").classList.remove("hidden");document.getElementById("codeError").innerText="❌ "+d.msg;}
}
function logout(){localStorage.removeItem("vip_access");location.reload();}
function go(){
 const m=document.getElementById("market").value;const tf=document.getElementById("tf").value;const ex=document.getElementById("ex").value;const file=document.getElementById("img").files[0];const tele=document.getElementById("tele").value;const r=document.getElementById("res");r.classList.remove("hidden");r.innerHTML="<div class=p-3 bg-black rounded-xl text-center animate-pulse text-xs>AI Analyzing...</div>";const fd=new FormData();fd.append("market",m);fd.append("tf",tf);fd.append("ex",ex);if(file)fd.append("image",file);fd.append("tele",tele);fetch("/analyze",{method:"POST",body:fd}).then(x=>x.json()).then(d=>{let sec=10;r.innerHTML="<div class=bg-black p-4 rounded-xl border border-zinc-700 text-center><p class=text-[10px] text-gray-500>"+d.market+"</p><p class=text-5xl font-black mt-2 "+(d.signal=="BUY"?"style=color:#4ade80":"style=color:#f87171")+">"+d.signal+"</p><p class=text-xs mt-2>"+d.reason+"</p><p class=text-xs mt-2>ENTRY: <b id=ct>"+sec+"s</b> | "+d.time+" | NAGIN L1: $1</p></div>";let iv=setInterval(()=>{sec--;let el=document.getElementById("ct");if(el)el.innerText=sec+"s";if(sec<=0){clearInterval(iv);el.innerText="TAKE NOW!";}},1000);});
}
setInterval(()=>{let el=document.getElementById("lp");if(el)el.innerText=(1.08+Math.random()*0.01).toFixed(5);},1500);
</script></body></html>`);
});

app.post('/verify', (req,res)=>{
  const code = (req.body.code||"").trim();
  if(code === ADMIN_CODE){ return res.json({ok:true, msg:"Admin Access Granted"}); }
  if(PAID_CODES.includes(code)){ return res.json({ok:true, msg:"VIP Access Granted"}); }
  return res.json({ok:false, msg:"Invalid Code! $20 Deposit kore Admin er kache code nao"});
});

app.post('/analyze', upload.single('image'), (req,res)=>{
  let sig = Math.random()>0.5?'BUY':'SELL';
  if(req.body.tele){
    if(req.body.tele.toUpperCase().includes('SELL')) sig='SELL';
    if(req.body.tele.toUpperCase().includes('BUY')) sig='BUY';
  }
  const reason = sig=='BUY' ? 'VIP Analysis: '+req.body.market+' Support e bullish rejection, RSI up. BUY confirm.' : 'VIP Analysis: '+req.body.market+' Resistance e bearish rejection, RSI down. SELL confirm.';
  res.json({market:req.body.market,tf:req.body.tf,ex:req.body.ex,signal:sig,time:new Date().toLocaleTimeString(),reason:reason});
});

app.listen(process.env.PORT||3000, ()=>console.log('VIP LOCK LIVE'));
