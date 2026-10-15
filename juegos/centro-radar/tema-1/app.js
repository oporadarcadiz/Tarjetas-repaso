'use strict';
const $=id=>document.getElementById(id),names={1:'Preliminar + I–III',2:'IV–VI',3:'VII–IX',4:'X + disposiciones'};
let storage;try{storage=localStorage;}catch{storage={getItem(){throw Error('Bloqueado')},setItem(){throw Error('Bloqueado')}}}
const params=new URLSearchParams(location.search),directMode=params.get('modo'),titles={tarjetas:'Tarjetas Radar',trampas:'Caza la trampa',completa:'Completa la norma',visual:'Mapa constitucional',mixto:'Test Tema 1',real:'Preguntas reales'};
const progress=RadarProgress.create(storage);let mode,round=[],index=0,marks=[],rated=false,timer,deadline=0,advance=1;
function notice(){$('notice').textContent='Al final de la ronda repetirás las dudas y los fallos.';}
function screen(name){for(const id of ['home','game','result'])$(id).hidden=id!==name;$('homeButton').hidden=name==='home'||Boolean(directMode);document.body.classList.toggle('playing',name==='game');}
function pool(){return RadarProgress.scope(RadarBank.mode(mode),+$('checkpoint').value,$('scope').value==='new');}
function button(text,fn){const b=document.createElement('button');b.textContent=text;b.addEventListener('click',fn);$('controls').append(b);return b;}
function start(nextMode,review=false,onlyIds=[]){clearInterval(timer);mode=nextMode;let list=pool();if(review)list=list.filter(x=>onlyIds.length?onlyIds.includes(x.id):['fallo','duda'].includes(progress.get(x.conceptId)?.lastOutcome));round=RadarProgress.select(list,onlyIds.length?onlyIds.length:+$('count').value,progress);if(!round.length){$('notice').textContent='No hay material de este modo en esta zona'+(review?' con fallos pendientes.':'.');return;}index=0;marks=[];const limited=!review&&round.length<+$('count').value;deadline=mode==='express'?Date.now()+60000:0;screen('game');render();if(limited)$('feedback').textContent='Hay '+round.length+' preguntas distintas disponibles en este bloque. No añadiremos preguntas inventadas para completar la ronda.';if(deadline)timer=setInterval(()=>{if(Date.now()>=deadline)finish();else $('position').textContent='Radar Express · '+Math.ceil((deadline-Date.now())/1000)+' s';},250);}
function rate(outcome,answer,cardRating=false,advanceNow=false){if(rated)return;rated=true;const q=round[index];progress.mark(q.conceptId,outcome,mode);marks.push({id:q.id,outcome});if(advanceNow){index+=advance;index>=round.length?finish():render();return;}if(cardRating){const state=outcome==='fallo'?'Fallé.':outcome==='duda'?'Lo marco como duda.':'Acerté.';$('feedback').textContent=state+((outcome!=='acierto'&&q.t)?' Recuerda: '+q.t:'');}else {const prefix=outcome==='fallo'?'Esta vez no. ':outcome==='duda'?'Marcado para repasar. ':'Correcto. ';const explanation=q.explanation?' · Explicación: '+q.explanation:'';$('feedback').textContent=prefix+'Respuesta: '+(answer||q.a)+explanation;}for(const b of $('controls').querySelectorAll('button,input'))b.disabled=true;$('next').hidden=false;notice();}
function shuffled(a){return a.map(v=>({v,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.v);}
function render(){rated=false;advance=1;$('controls').className='';const q=round[index],correct=marks.filter(x=>x.outcome==='acierto').length,kind=q.type==='official'?(q.adapted?'ADAPTADA DE EXAMEN · ':'BANCO DE EXAMEN · COTEJO PENDIENTE · ')+q.source:'CREADA POR OPORADARCÁDIZ';$('position').textContent=(index+1)+' de '+round.length+' · '+correct+' '+(correct===1?'acierto':'aciertos');$('kind').textContent=kind;$('kind').hidden=false;const sourceLink=$('sourceLink'),sourceDescription=$('sourceDescription');sourceLink.hidden=!(q.type==='official'&&q.sourceUrl);if(!sourceLink.hidden)sourceLink.href=q.sourceUrl;sourceDescription.hidden=!(q.type==='official'&&q.adapted);sourceDescription.textContent=q.adapted?'Pregunta reformulada para practicar. La versión literal debe consultarse en el documento original.':'';$('question').textContent=q.q;$('feedback').textContent='';$('controls').replaceChildren();$('next').hidden=true;$('image').hidden=mode!=='visual';if(mode==='visual'){$('image').src='assets/'+q.image;$('question').textContent='¿Qué debes recordar al ver esta imagen?';}
 if(mode==='empareja'){renderPairs();return;}
 if(mode==='tarjetas'){button('Ver respuesta',()=>{const answer=document.createElement('p');answer.className='card-answer';answer.textContent=q.a;$('controls').replaceChildren(answer);button('Acerté',()=>rate('acierto','',true,true));button('Dudé',()=>rate('duda','',true));button('Fallé',()=>rate('fallo','',true));});}
 else if(mode==='trampas'){const truth=Math.random()>=.5;$('question').textContent=truth?q.a:q.trap;button('Correcta',()=>rate(truth?'acierto':'fallo',q.a));button('Hay una trampa',()=>rate(truth?'fallo':'acierto',q.a));}
 else if(mode==='completa'){$('question').textContent=q.blank[0];const input=document.createElement('input');input.setAttribute('aria-label','Completa la palabra que falta');input.autocomplete='off';$('controls').append(input);button('Comprobar',()=>{const norm=s=>s.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');rate(norm(input.value)===norm(q.blank[1])?'acierto':'fallo',q.a)});button('Dudé',()=>rate('duda'));}
 else{if(mode==='relacion')$('question').textContent='Relaciona: '+q.relation;if(mode==='empareja')$('question').textContent='Empareja: '+q.q;const distractors=shuffled(pool().filter(x=>x.id!==q.id&&x.a!==q.a).map(x=>x.a));const choices=Array.isArray(q.choices)?shuffled(q.choices):shuffled([q.a,...new Set(distractors.slice(0,mode==='visual'?2:3))]);for(const choice of choices)button(choice,()=>rate(choice===q.a?'acierto':'fallo'));button('Dudé',()=>rate('duda'));}
 $('question').focus();}
function finish(){
 clearInterval(timer);screen('result');
 const correct=marks.filter(x=>x.outcome==='acierto').length;
 const pending=marks.filter(x=>['fallo','duda'].includes(x.outcome)).map(x=>x.id);
 const unanswered=Math.max(0,round.length-marks.length);
 $('score').textContent=correct+' aciertos · '+marks.filter(x=>x.outcome==='duda').length+' dudas · '+marks.filter(x=>x.outcome==='fallo').length+' fallos'+(unanswered?' · '+unanswered+' sin responder':'')+' · '+round.length+' preguntas.';
 const groups=new Map();
 for(const q of round){
   const key=q.checkpoint||1,group=groups.get(key)||{total:0,ok:0,duda:0,fallo:0,blank:0};
   group.total++;
   const outcome=marks.find(m=>m.id===q.id)?.outcome;
   if(outcome==='acierto')group.ok++;else if(outcome==='duda')group.duda++;else if(outcome==='fallo')group.fallo++;else group.blank++;
   groups.set(key,group);
 }
 const root=$('diagnostic');root.replaceChildren();
 for(const [key,g] of [...groups].sort((a,b)=>a[0]-b[0])){
   const block=document.createElement('div');block.className='diagnostic-row';
   const strong=document.createElement('strong');strong.textContent='Radar '+key+' · '+(names[key]||'Bloque')+' · '+g.ok+'/'+g.total+' aciertos';
   const detail=document.createElement('span');detail.textContent=g.duda+' dudas · '+g.fallo+' fallos'+(g.blank?' · '+g.blank+' sin responder':'');
   block.append(strong,detail);root.append(block);
 }
 const needs=[...groups].filter(([k,g])=>g.ok<g.total).sort((a,b)=>(a[1].ok/a[1].total)-(b[1].ok/b[1].total));
 $('nextAdvice').textContent=needs.length?'Prioridad de repaso: Radar '+needs[0][0]+' ('+names[needs[0][0]]+'). Repite tus dudas y fallos antes de avanzar.':'¡Buen trabajo! Has acertado todas las preguntas respondidas.';
 $('retry').disabled=!pending.length;
 $('retry').textContent=pending.length?'Repetir '+pending.length+' '+(pending.length===1?'pregunta pendiente':'dudas y fallos'):'Ronda terminada';
 $('retry').onclick=()=>start(mode,true,pending);
}
function renderPairs(){
 const batch=round.slice(index,index+4),rights=shuffled(batch);advance=batch.length;let chosen=null;const completed=new Set(),failed=new Set();
 $('question').textContent='Une cada señal con su respuesta. Pulsa una señal de la izquierda y su pareja de la derecha.';$('controls').className='pairs';
 const left=document.createElement('div'),right=document.createElement('div');$('controls').append(left,right);
 for(const q of batch){const b=document.createElement('button');b.textContent=q.q;b.dataset.pair=q.id;b.onclick=()=>{chosen=q;left.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));};left.append(b)}
 for(const q of rights){const b=document.createElement('button');b.textContent=q.a;b.dataset.pair=q.id;b.onclick=()=>{
  if(!chosen){$('feedback').textContent='Elige primero una señal de la izquierda.';return;}
  if(chosen.id!==q.id){failed.add(chosen.id);$('feedback').textContent='Esa no es la pareja. Inténtalo de nuevo.';return;}
  const outcome=failed.has(q.id)?'fallo':'acierto';progress.mark(q.conceptId,outcome,mode);marks.push({id:q.id,outcome});completed.add(q.id);b.disabled=true;left.querySelector('[data-pair="'+q.id+'"]').disabled=true;chosen=null;$('feedback').textContent=outcome==='fallo'?'Pareja encontrada. La guardamos para repasar.':'Pareja localizada.';notice();
  if(completed.size===batch.length){rated=true;$('next').hidden=false;}
 };right.append(b)}
 $('question').focus();
}
$('next').onclick=()=>{index+=advance;index>=round.length?finish():render()};$('homeButton').onclick=()=>{clearInterval(timer);screen('home')};
function coverage(){const cp=+$('checkpoint').value;$('scopeLabel').hidden=cp===1;if(cp===1)$('scope').value='all';$('coverage').textContent='Lo nuevo: '+names[cp]+'. Acumulado: '+Object.keys(names).filter(n=>+n<=cp).map(n=>names[n]).join(' + ');}
$('checkpoint').onchange=coverage;document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>start(b.dataset.mode));const requested=params.get('radar');if(['1','2','3','4'].includes(requested))$('checkpoint').value=requested;coverage();notice();if(['tarjetas','trampas','completa','visual','mixto','real'].includes(directMode)){const title=$('activityTitle');title.textContent=titles[directMode];title.hidden=false;document.querySelector('.modes').hidden=true;$('checkpoint').closest('label').hidden=true;$('scopeLabel').hidden=true;$('coverage').hidden=true;const startButton=$('startDirect');startButton.hidden=false;startButton.textContent='Empezar '+titles[directMode];startButton.onclick=()=>start(directMode);}
