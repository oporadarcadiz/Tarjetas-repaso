/* Read-only bridge. Rows without explicit reviewed classification never enter a checkpoint. */
(function(root){
 root.RadarSheet={load(){return new Promise((resolve,reject)=>{
  const callback='radarSheet'+Date.now(),script=document.createElement('script');
  const timer=setTimeout(()=>finish(Error('La hoja no respondió.')),12000);
  function finish(error,data){clearTimeout(timer);script.remove();delete root[callback];error?reject(error):resolve(data);}
  root[callback]=response=>{try{
   if(response.status!=='ok')throw Error('La hoja no permite lectura.');
   const normalized=QuizCore.normalize(response.table);
   const classified=normalized.bank.filter(q=>q.reviewed&&/^t1\/[a-z0-9_:-]+$/.test(q.conceptId)&&[1,2,3,4].includes(q.checkpoint)&&q.type.toUpperCase()==='OFICIAL'&&q.organism&&/^\d{4}$/.test(q.year)&&/^https:\/\//.test(q.source));
   finish(null,{questions:classified.map(q=>({id:'sheet:'+q.id,q:q.question,a:q.choices[q.correct],choices:q.choices,correct:q.correct,conceptId:q.conceptId,checkpoint:q.checkpoint,theme:1,type:'official',source:q.organism+' · '+q.year,t:q.explanation,sourceUrl:q.source})),pending:normalized.bank.length-classified.length});
  }catch(e){finish(e)}};
  script.onerror=()=>finish(Error('No se pudo consultar la hoja.'));
  script.src='https://docs.google.com/spreadsheets/d/1cxhXuTaRsF7O8BTHkl8Bz3WKODCKt8hjK7TaFV_oEJI/gviz/tq?gid=472358706&headers=1&tqx=out:json;responseHandler:'+callback;
  document.head.append(script);
 });}};
})(globalThis);
