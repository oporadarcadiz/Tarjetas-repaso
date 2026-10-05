(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RadarCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const KEYS={history:'oporadar_tema1_nivel2_card_stats',review:'oporadar_tema1_nivel2_review_ids_v2',session:'oporadar_tema1_nivel2_session_v2'};
 const TYPES=['fallo','duda','acierto'];
 const count=x=>Number.isFinite(x)&&x>=0?Math.min(Math.floor(x),1000000):0;
 function shuffle(list,rng){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function priority(d,now){if(!d)return 4;let w=d.lastOutcome==='fallo'?18:d.lastOutcome==='duda'?10:d.lastOutcome==='acierto'?Math.max(.8,2-d.streak*.3):Math.min(18,1+d.fallo*4+d.duda*2-d.acierto*.5);const days=Math.max(0,(now-d.lastSeen)/86400000);if(days>7)w+=2;if(days>14)w+=2;return w;}
 function select(cards,n,history,now,rng=Math.random){const available=[...cards],out=[];n=Math.min(cards.length,Math.max(0,Math.floor(n)));while(out.length<n){const weights=available.map(c=>priority(history[c.id],now)),total=weights.reduce((a,b)=>a+b,0);let r=rng()*total,j=0;for(;j<weights.length-1;j++){r-=weights[j];if(r<0)break;}out.push(available.splice(j,1)[0]);}return shuffle(out,rng);}
 function create(cards,storage,now=Date.now,rng=Math.random){
  if(!cards.length||new Set(cards.map(c=>c.id)).size!==cards.length)throw Error('Mazo inválido');
  const byId=new Map(cards.map(c=>[c.id,c]));let writable=true;
  function read(key,fallback){try{const raw=storage.getItem(key);if(raw===null)return fallback;return JSON.parse(raw);}catch{return fallback;}}
  function write(key,value){try{storage.setItem(key,JSON.stringify(value));}catch{writable=false;}}
  try{storage.setItem('oporadar_storage_probe','1');storage.removeItem('oporadar_storage_probe');}catch{writable=false;}
  const raw=read(KEYS.history,{}),history={};
  if(raw&&typeof raw==='object'&&!Array.isArray(raw))for(const c of cards){const d=raw[c.id];if(d&&typeof d==='object')history[c.id]={acierto:count(d.acierto),duda:count(d.duda),fallo:count(d.fallo),lastSeen:0,lastOutcome:TYPES.includes(d.lastOutcome)?d.lastOutcome:null,streak:count(d.streak)};}
  // Millisecond dates must not use the bounded counter sanitizer.
  for(const c of cards)if(history[c.id]){const time=raw[c.id].lastSeen;history[c.id].lastSeen=Number.isFinite(time)&&time>0&&time<=now()+86400000?time:0;}
  const saved=read(KEYS.review,null);let pending=new Set();
  if(Array.isArray(saved))pending=new Set(saved.filter(id=>byId.has(id)));
  else {const legacy=read('oporadar_t1_review',[]);if(Array.isArray(legacy))for(const c of legacy){if(c&&byId.has(c.id))pending.add(c.id);else if(c&&typeof c.q==='string'){const match=cards.find(x=>x.q===c.q);if(match)pending.add(match.id);}}}
  let session=null;const restored=read(KEYS.session,null);
  function validSession(s){return s&&s.version===2&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.length<=cards.length&&new Set(s.ids).size===s.ids.length&&s.ids.every(id=>byId.has(id))&&Number.isInteger(s.index)&&s.index>=0&&s.index<=s.ids.length&&Array.isArray(s.marks)&&s.marks.length===s.index&&s.marks.every((m,i)=>m.id===s.ids[i]&&TYPES.includes(m.type))&&typeof s.revealed==='boolean'&&typeof s.review==='boolean';}
  if(validSession(restored)){session=restored;for(const m of session.marks){if(m.type==='acierto')pending.delete(m.id);else pending.add(m.id);}}
  function persist(){write(KEYS.history,history);write(KEYS.review,[...pending]);write(KEYS.session,session);}
  function begin(n,review=false){const chosen=review?shuffle(cards.filter(c=>pending.has(c.id)),rng):select(cards,n,history,now(),rng);if(!chosen.length)return false;session={version:2,ids:chosen.map(c=>c.id),index:0,marks:[],revealed:false,review};persist();return true;}
  function reveal(){if(!session||session.index>=session.ids.length)return false;session.revealed=true;persist();return true;}
  function rate(type){if(!session||!session.revealed||session.index>=session.ids.length||!TYPES.includes(type))return false;const id=session.ids[session.index],d=history[id]||{acierto:0,duda:0,fallo:0,streak:0,lastSeen:0,lastOutcome:null};d[type]++;d.streak=type==='acierto'?d.streak+1:0;d.lastSeen=now();d.lastOutcome=type;history[id]=d;if(type==='acierto')pending.delete(id);else pending.add(id);session.marks.push({id,type});session.index++;session.revealed=false;persist();return true;}
  function state(){const stats={acierto:0,duda:0,fallo:0};if(session)for(const m of session.marks)stats[m.type]++;return {phase:!session?'home':session.index===session.ids.length?'result':'game',card:session&&byId.get(session.ids[session.index]),index:session?.index||0,total:session?.ids.length||0,revealed:!!session?.revealed,stats,pending:pending.size,writable,review:!!session?.review,answered:session?.marks.length||0};}
  return {begin,reveal,rate,state,home(){session=null;persist();},history(){return JSON.parse(JSON.stringify(history));},session(){return session&&JSON.parse(JSON.stringify(session));}};
 }
 return {KEYS,priority,select,create};
});
