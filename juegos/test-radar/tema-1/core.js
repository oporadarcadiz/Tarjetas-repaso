(function(root){
  'use strict';
  const fields=['id','tema','pregunta','opcion_a','opcion_b','opcion_c','opcion_d','correcta','explicacion','activa'];
  function normalize(table){
    if(!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) throw new Error('Formato de preguntas incorrecto.');
    const labels=table.cols.map(c=>String(c.label||'').trim().toLowerCase());
    if(fields.some(f=>!labels.includes(f))) throw new Error('Faltan columnas en la hoja de preguntas.');
    const seen=new Set(),bank=[];let rejected=0;
    for(const row of table.rows){
      const record=Object.fromEntries(labels.map((label,i)=>[label,String(row.c?.[i]?.v??'').trim()]));
      if(record.tema!=='1'||!['SI','SÍ','TRUE','1'].includes(record.activa.toUpperCase())) continue;
      const correct=record.correcta.toUpperCase();
      const choices=['a','b','c','d'].map(l=>record['opcion_'+l]);
      if(!record.id||!record.pregunta||choices.some(c=>!c)||new Set(choices).size!==4||!/^[ABCD]$/.test(correct)||seen.has(record.id)){rejected++;continue;}
      seen.add(record.id);
      bank.push({id:record.id,question:record.pregunta,choices,correct:correct.charCodeAt(0)-65,explanation:record.explicacion,type:record.tipo||'PROPIA',source:record.fuente||''});
    }
    return {bank,rejected};
  }
  function select(bank,n,rng=Math.random){
    const a=bank.slice();
    for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a.slice(0,Math.min(n,a.length));
  }
  const api={normalize,select};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.QuizCore=api;
})(typeof window==='undefined'?globalThis:window);

