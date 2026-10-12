(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RadarProgress=api;})(globalThis,function(){
 'use strict';
 const KEY='oporadar_concepts_v1';
 const valid=id=>/^t\d+\/[a-z0-9_:-]+$/.test(id);
 function create(storage,now=Date.now){
  let fallback={},writable=true;
  function read(){if(!writable)return fallback;try{const value=JSON.parse(storage.getItem(KEY)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{writable=false;return fallback;}}
  function get(id){const d=read()[id];return valid(id)&&d&&['acierto','duda','fallo'].includes(d.lastOutcome)?d:null;}
  function mark(id,outcome,mode){if(!valid(id)||!['acierto','duda','fallo'].includes(outcome))return false;
   const all=read(),old=get(id)||{},count=n=>Number.isFinite(n)&&n>=0?Math.min(n,1000000):0;
   all[id]={acierto:count(old.acierto),duda:count(old.duda),fallo:count(old.fallo),streak:outcome==='acierto'?count(old.streak)+1:0,lastOutcome:outcome,lastSeen:now(),mode};all[id][outcome]++;
   fallback=all;try{storage.setItem(KEY,JSON.stringify(all));}catch{writable=false;}return true;
  }
  function priority(id){const d=get(id);return !d?4:d.lastOutcome==='fallo'?18:d.lastOutcome==='duda'?10:Math.max(1,3-(d.streak||0)*.5);}
  return {get,mark,priority,writable:()=>writable};
 }
 function scope(bank,checkpoint,onlyNew=false,theme=1){checkpoint=Number(checkpoint);if(![1,2,3,4].includes(checkpoint))return [];return bank.filter(x=>x.theme===theme&&x.checkpoint<=checkpoint&&(!onlyNew||x.checkpoint===checkpoint));}
 function select(bank,n,progress,rng=Math.random){const pool=[...bank],picked=[];n=Math.min(pool.length,Math.max(0,Math.floor(n)));while(picked.length<n){const ws=pool.map(x=>progress.priority(x.conceptId)),sum=ws.reduce((a,b)=>a+b,0);let r=rng()*sum,i=0;for(;i<ws.length-1;i++){r-=ws[i];if(r<0)break;}picked.push(pool.splice(i,1)[0]);}return picked;}
 return {KEY,create,scope,select};
});
