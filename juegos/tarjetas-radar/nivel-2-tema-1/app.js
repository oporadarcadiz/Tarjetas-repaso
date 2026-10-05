'use strict';
const $=id=>document.getElementById(id);
let storage;
try{storage=window.localStorage;}catch{storage={getItem(){throw Error('Bloqueado');},setItem(){throw Error('Bloqueado');},removeItem(){}};}
const engine=RadarCore.create(RadarCards,storage);
function render(focus=false){
 const s=engine.state();['home','game','result'].forEach(id=>$(id).hidden=id!==s.phase);
 $('storageNotice').textContent=s.writable?'Tu progreso se guarda automáticamente.':'Este navegador no permite guardar el progreso. Puedes jugar, pero al cerrar o recargar perderás esta sesión.';
 $('storageNotice').classList.toggle('warning',!s.writable);
 $('pending').textContent=s.pending?s.pending+' tarjetas con fallos o dudas pendientes.':'No tienes fallos ni dudas pendientes.';
 $('savedReview').disabled=!s.pending;
 if(s.phase==='game'){
  $('position').textContent=(s.review?'Fallos · ':'')+'Tarjeta '+(s.index+1)+' de '+s.total;
  $('liveScore').textContent=s.stats.acierto+' aciertos';$('progress').style.width=(s.index/s.total*100)+'%';
  $('question').textContent=s.card.q;$('answer').textContent=s.card.a;$('hint').textContent=s.card.t;$('hint').hidden=!s.card.t;
  $('answerBox').hidden=!s.revealed;$('rating').hidden=!s.revealed;$('reveal').hidden=s.revealed;
  if(focus)$(s.revealed?'answerBox':'question').focus();
 }else if(s.phase==='result'){
  $('percentage').textContent=Math.round(s.stats.acierto/s.total*100)+'%';$('ok').textContent=s.stats.acierto;$('doubt').textContent=s.stats.duda;$('wrong').textContent=s.stats.fallo;
  $('summary').textContent=s.pending?'Quedan '+s.pending+' tarjetas con fallos o dudas. Rastréalas de nuevo.':'No quedan fallos ni dudas pendientes. Puedes iniciar otro repaso.';$('review').disabled=!s.pending;
  if(focus)$('resultTitle').focus();
 }
}
document.querySelectorAll('[data-count]').forEach(b=>b.addEventListener('click',()=>{engine.begin(Number(b.dataset.count));render(true);}));
document.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>{if(engine.rate(b.dataset.rate))render(true);}));
$('reveal').addEventListener('click',()=>{engine.reveal();render();document.querySelector('[data-rate]').focus();});
for(const id of ['review','savedReview'])$(id).addEventListener('click',()=>{engine.begin(40,true);render(true);});
$('newRound').addEventListener('click',()=>{engine.home();render();document.querySelector('[data-count]').focus();});
render();
