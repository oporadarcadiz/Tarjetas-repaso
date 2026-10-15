(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../../tarjetas-radar/nivel-2-tema-1/cards.js'),require('./extra.js'));else root.RadarBank=factory(root.RadarCards,root.RadarExtra);})(globalThis,function(cards,extras){
 const groups={titulo4:2,titulo5:2,titulo6:2,tc_fuera:2,titulo7:3,titulo8:3,titulo9:3,titulo10:4,disposiciones:4,estructura_articulos:4};
 const bank=cards.map(c=>({...c,theme:1,checkpoint:groups[c.id]||1,conceptId:'t1/'+c.id,type:'training'}));
 const extra=[['art140','¿Qué garantiza el artículo 140?','La autonomía de los municipios y su personalidad jurídica plena.',3],['art137','¿Cómo se organiza territorialmente el Estado?','En municipios, provincias y comunidades autónomas.',3],['tc_miembros','¿Cuántos miembros tiene el Tribunal Constitucional?','12 miembros.',3],['tc_mandato','¿Cuánto dura su mandato?','9 años.',3],['presupuestos','¿Quién elabora los Presupuestos?','El Gobierno; las Cortes los examinan, enmiendan y aprueban.',3]];
 for(const [id,q,a,checkpoint] of extra)bank.push({id,q,a,t:'',theme:1,checkpoint,conceptId:'t1/'+id,type:'training'});
 bank.push(...extras);
 const traps={art1_estado:'España se constituye en un Estado liberal y democrático de Derecho.',tc_fuera:'El Tribunal Constitucional pertenece al Poder Judicial.',art5:'La capital del Estado es Barcelona.',tc_miembros:'El Tribunal Constitucional tiene 9 miembros.'};
 Object.assign(traps,{confianza:'La cuestión de confianza necesita mayoría absoluta.',censura:'La moción de censura necesita mayoría simple.',cgpj:'El Gobierno es el órgano de gobierno del Poder Judicial.',art128:'Toda la riqueza se subordina al interés privado.',art141:'El artículo 141 regula las comunidades autónomas.',art149:'El artículo 149 enumera competencias exclusivas de los municipios.',reforma_167:'Toda reforma constitucional exige siempre tres quintos.',reforma_referendum:'El referéndum es opcional en la reforma agravada.',disp_final:'La Constitución entró en vigor al día siguiente de publicarse.'});
 const blanks={art1_estado:['España se constituye en un Estado ______ y democrático de Derecho.','social'],art1_soberania:['La soberanía nacional reside en el ______ español.','pueblo'],art5:['La capital del Estado es la villa de ______.','Madrid'],tc_miembros:['El Tribunal Constitucional tiene ___ miembros.','12'],tc_mandato:['El mandato es de ___ años.','9'],tc_fuera:['El Tribunal Constitucional NO forma parte del Poder ______.','Judicial']};
 const images={titulo1:'Gemini_bql3.jpg',titulo2:'Gemini_fp3o.jpg',titulo3:'Gemini_m2cd.jpg',titulo4:'IMG_8288.PNG',titulo5:'IMG_8289.PNG',titulo6:'IMG_8293.PNG',titulo7:'IMG_8294.PNG',titulo8:'IMG_8295.PNG',titulo9:'IMG_8297.PNG',titulo10:'IMG_8299.PNG',preliminar:'Gemini_9lj9_sin_articulos.png'};
 images.tc_fuera='IMG_8297.PNG';
 const relations={fechas_cortes:'Cortes Generales → Constitución de 1978',fechas_pueblo:'Pueblo español → Constitución de 1978',fechas_rey:'Rey → Constitución de 1978',fechas_boe:'BOE → Constitución de 1978',presupuestos:'Gobierno / Cortes → Presupuestos',tc_fuera:'Tribunal Constitucional → institución'};
 Object.assign(relations,{gob_ejecutiva:'Función ejecutiva → institución',control_congreso:'Responsabilidad política del Gobierno → Cámara',cgpj:'Gobierno del Poder Judicial → órgano',cuentas:'Fiscalización económica pública → órgano'});
 const source={
  c25:{label:'Ayuntamiento de Cádiz · 2025',note:'12 plazas de Subalternos/as. Cuadernillo oficial 22/02/2025 y plantilla definitiva 24/03/2025.'},
  s22:{label:'Ayuntamiento de Sanlúcar de Barrameda · 2022',note:'Conserje, contrato de relevo y lista de reservas. Examen oficial corregido.'},
  f26:{label:'Ayuntamiento de Fuenlabrada · 2026',note:'20 plazas de Conserje. Matriz correctora definitiva de 04/09/2026.'},
  g26:{label:'Cabildo de Gran Canaria · 2026',note:'5 plazas de Subalterno. Plantilla correctora oficial firmada el 19/08/2026.'},
  b26:{label:'Ayuntamiento de Barakaldo · 2026',note:'1 plaza de Subalterno/a, turno libre. Examen y corrector oficial, modelo A.'}
 };
 const sourceLinks={"c25":"https://institucional.cadiz.es/12-plazas-de-subalternoas-turno-libre-oep-202120222023","s22":"https://www.sanlucardebarrameda.es/sites/default/files/EXAMEN%20CONSERJE%20CORREGIDO.pdf","f26":"https://drive.google.com/file/d/1dRQZFyygairudmOMWgyZdkBXo6OFH42J/view","g26":"https://drive.google.com/file/d/1gAynR6rKMG_Xt3V9_GRvEo3mTEVlyyzf/view","b26":"https://drive.google.com/file/d/16HyR0bPsUi8PwtH_Cq7b3R5u8hkc8Opn/view"};
 const legalExplanations={
  art1_valores:'Art. 1.1 CE: libertad, justicia, igualdad y pluralismo político son los cuatro valores superiores expresamente mencionados.',
  art1_soberania:'Art. 1.2 CE: la soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado.',
  art16:'Art. 16.2 CE: nadie puede ser obligado a declarar sobre su ideología, religión o creencias.',
  art17:'Art. 17.2 CE: la detención preventiva no puede durar más de lo estrictamente necesario y, en todo caso, el máximo ordinario es de 72 horas.',
  art21_reunion:'Art. 21.2 CE: las reuniones en tránsito público y manifestaciones requieren comunicación previa; solo pueden prohibirse por razones fundadas de alteración del orden público con peligro para personas o bienes.',
  art137:'Art. 137 CE: el Estado se organiza territorialmente en municipios, provincias y comunidades autónomas que se constituyan.',
  art140:'Art. 140 CE: la Constitución garantiza la autonomía municipal.',
  art141:'Art. 141.1 CE: la provincia es una entidad local con personalidad jurídica propia.',
  art134:'Art. 134.1 CE: el Gobierno elabora los Presupuestos Generales del Estado; las Cortes Generales los examinan, enmiendan y aprueban.',
  presupuestos:'Art. 134.1 CE: corresponde al Gobierno elaborarlos y a las Cortes examinarlos, enmendarlos y aprobarlos.',
  tc_miembros:'Art. 159.1 CE: el Tribunal Constitucional se compone de doce miembros.',
  tc_renovacion:'Art. 159.3 CE: mandato de nueve años con renovación por terceras partes cada tres.',
  reforma_167:'Art. 167.1 CE: la reforma ordinaria requiere, con carácter general, mayoría de tres quintos de cada Cámara.',
  reforma_168:'Art. 168 CE: para revisión total o determinados bloques especialmente protegidos se exige el procedimiento agravado, incluida mayoría de dos tercios y disolución de las Cortes.',
  reforma_167_referendum:'Art. 167.3 CE: se somete a referéndum si lo pide una décima parte de los miembros de cualquiera de las Cámaras en los quince días siguientes a su aprobación.',
  titulo7:'Título VII CE: Economía y Hacienda, artículos 128 a 136.',
  art29_peticion:'Art. 29.1 CE: se reconoce el derecho de petición individual y colectiva, por escrito, en la forma y con los efectos que determine la ley.',
  art2:'Art. 2 CE: unidad de la Nación española y reconocimiento y garantía de la autonomía de nacionalidades y regiones.',
  art5:'Art. 5 CE: la capital del Estado es la villa de Madrid.',
  art12:'Art. 12 CE: la mayoría de edad se alcanza a los dieciocho años.',
  titulo1:'El Título I CE se denomina «De los derechos y deberes fundamentales».',
  titulo9:'El Título IX CE regula el Tribunal Constitucional.',
  titulo10:'El Título X CE se denomina «De la reforma constitucional».',
  estructura_articulos:'La Constitución tiene artículos numerados del 1 al 169.'
 };
 const literalIds=new Set(['g26-01','c25-01','s22-08','s22-09','s22-13']);
 
 const official=[
  ['f26-01','art16',1,'El artículo 16 de la Constitución Española establece que:',['Nadie podrá ser obligado a declarar sobre su ideología, religión o creencias.','Nadie podrá ser obligado a declarar sobre religión, pero sí sobre sus creencias.','Las dos afirmaciones anteriores son incorrectas.'],0,'f26',392],
  ['f26-02','art137',3,'Según el artículo 137 de la Constitución Española, ¿en qué entidades se organiza territorialmente el Estado?',['En municipios, provincias y en las comunidades autónomas que se constituyan.','En comarcas, provincias y comunidades autónomas.','En comunidades autónomas, provincias y distritos.'],0,'f26',393],
  ['g26-01','titulo7',3,'El Título «Economía y Hacienda» de la Constitución Española es el número:',['VI','VII','VIII'],1,'g26',412],
  ['g26-02','art17',1,'Según la Constitución Española, ¿en qué plazo máximo el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial?',['48 horas','72 horas','24 horas'],1,'g26',413],
  ['g26-03','suspension_derechos',1,'Los derechos que enumera el artículo 55.1 podrán ser suspendidos cuando se acuerde la declaración del estado de:',['Alarma','Guerra','Excepción o sitio'],2,'g26',414],
  ['g26-04','reforma_167',4,'Los proyectos de reforma constitucional deberán ser aprobados por una mayoría de:',['Tres quintos del Congreso y dos quintos del Senado.','Tres quintos de cada Cámara.','Dos tercios de cada Cámara.'],1,'g26',415],
  ['g26-05','reforma_168',4,'En una revisión total o una reforma que afecte a los bloques protegidos del artículo 168, la aprobación del principio exige:',['Mayoría absoluta','Mayoría de dos tercios','Mayoría de tres quintos'],1,'g26',416],
  ['g26-06','art21_reunion',1,'La autoridad podrá prohibir una reunión en lugares de tránsito público o una manifestación cuando:',['No se haya solicitado autorización administrativa expresa.','Existan razones fundadas de alteración del orden público, con peligro para personas o bienes.','Se prevea una elevada asistencia aunque no exista riesgo.'],1,'g26',417],
  ['b26-01','art1_valores',1,'El valor superior del ordenamiento jurídico que NO aparece expresamente recogido en el artículo 1.1 de la Constitución es:',['La libertad','La igualdad','El pluralismo político','La solidaridad'],3,'b26',472],
  ['b26-02','art140',3,'Según el artículo 140 de la Constitución, la autonomía de los municipios se garantiza:',['En los términos que establezca la legislación autonómica.','Por la Constitución.','Mediante una ley orgánica específica de régimen local.','A través de los estatutos de autonomía.'],1,'b26',528],
  ['c25-01','art1_valores',1,'La Constitución Española de 1978 no propugna como valor superior de su ordenamiento jurídico:',['La igualdad','El pluralismo político','La seguridad','La justicia'],2,'c25',322],
  ['c25-02','art2',1,'La Constitución se fundamenta en la indisoluble unidad de la Nación española, patria común e indivisible de todos los españoles, según el:',['Artículo 9','Artículo 1','Artículo 2','Artículo 10'],2,'c25',323],
  ['c25-03','titulo8',3,'El Capítulo II del Título VIII de la Constitución Española se denomina:',['De las Comunidades Autónomas','De la Administración Local','De las relaciones entre el Gobierno y las Cortes Generales','De los Tratados Internacionales'],1,'c25',324],
  ['c25-04','art29_peticion',1,'El derecho de petición se reconoce en el artículo 29.1 para todos los españoles:',['Solo de forma colectiva y con arreglo a las leyes.','Individual y colectivamente, por escrito, en la forma y con los efectos que determine la ley.','Solo individualmente y con arreglo a las leyes.','Individual y colectivamente, en la forma y con los efectos que determine la legislación específica.'],1,'c25',325],
  ['c25-05','art23_participacion',1,'El derecho a participar en los asuntos públicos directamente o por medio de representantes se regula en:',['Artículo 13','Artículo 24','Artículo 23','Artículo 10'],2,'c25',326],
  ['c25-06','art28_huelga',1,'El derecho a la huelga, reconocido en el artículo 28.2 de la Constitución Española:',['Podrá suspenderse en el estado de alarma.','Podrá suspenderse en el estado de excepción o de sitio.','No podrá suspenderse en el estado de sitio.','No podrá suspenderse en ningún caso.'],1,'c25',327],
  ['c25-07','art9_garantias',1,'No está garantizado por la Constitución Española el principio de:',['Publicidad de las normas.','Retroactividad de las disposiciones sancionadoras no favorables.','Responsabilidad.','Interdicción de la arbitrariedad de los poderes públicos.'],1,'c25',328],
  ['s22-01','titulo1_capitulos',1,'¿De cuántos capítulos consta el Título I de la Constitución Española de 1978?',['Cinco','Seis','Siete','Cuatro'],0,'s22',214],
  ['s22-02','art35',1,'El deber de trabajar y el derecho al trabajo se regulan en el artículo:',['30','34','35','36'],2,'s22',215],
  ['s22-03','art18_domicilio',1,'El artículo 18.2 de la Constitución establece que:',['El domicilio es inviolable, sin excepción.','El domicilio es inviolable; no cabe entrada o registro sin consentimiento del titular o resolución judicial, salvo flagrante delito.','La autoridad puede entrar cuando lo considere.','Todas son verdaderas.'],1,'s22',216],
  ['s22-04','art10_2',1,'El artículo 10.2 de la Constitución establece que las normas relativas a derechos fundamentales se interpretarán conforme a:',['Los tratados y acuerdos internacionales ratificados por España.','La Declaración Universal de Derechos Humanos y los tratados y acuerdos internacionales ratificados por España, con consulta a cada comunidad autónoma.','Solo la Declaración Universal de Derechos Humanos.','La Declaración Universal de Derechos Humanos y los tratados y acuerdos internacionales ratificados por España.'],3,'s22',217],
  ['s22-05','art2_autonomia',1,'El derecho a la autonomía de las nacionalidades y regiones se reconoce:',['En el Título II.','En el artículo 2.','En el artículo 3.','En el Título III.'],1,'s22',226],
  ['s22-06','fecha_6d',1,'Respecto a la Constitución Española, la fecha del 6 de diciembre de 1978 corresponde a:',['Publicación en el BOE.','Sanción por el Rey.','Aprobación por las Cortes.','Ratificación en referéndum.'],3,'s22',232],
  ['s22-07','art1_forma',1,'Según el artículo 1.3 de la Constitución, la forma política del Estado español es:',['Democracia parlamentaria.','Gobierno parlamentario.','Monarquía parlamentaria.','República democrática.'],2,'s22',234],
  ['s22-08','estructura_articulos',4,'¿Cuántos artículos componen la Constitución Española?',['167','166','169','168'],2,'s22',236],
  ['s22-09','titulo1',1,'¿Qué nombre recibe el Título I de la Constitución Española?',['De los derechos y deberes fundamentales.','De la Corona.','De las Cortes Generales.','Del Gobierno y de la Administración.'],0,'s22',237],
  ['s22-10','art141',3,'El artículo 141 de la Constitución destaca que la provincia es una entidad local con personalidad jurídica:',['Propia.','Plena.','Única.','Indivisible.'],0,'s22',242],
  ['s22-11','art18_comunicaciones',1,'La Constitución garantiza el secreto de las comunicaciones salvo:',['Resolución administrativa.','Resolución judicial.','Resolución judicial y administrativa.','Caso de flagrante delito.'],1,'s22',245],
  ['s22-12','titulo9',3,'¿En qué título de la Constitución se regula el Tribunal Constitucional?',['Título X','Título XI','Título VIII','Título IX'],3,'s22',257],
  ['s22-13','titulo10',4,'¿Cómo se denomina el Título X de la Constitución Española?',['Del Tribunal Constitucional.','Del Tribunal de Cuentas.','De la reforma constitucional.','De la reforma de cuentas.'],2,'s22',261]
 ].map(([id,concept,checkpoint,q,choices,correct,origin,row])=>({id,conceptId:'t1/'+concept,checkpoint,q,choices,correct,a:choices[correct],theme:1,type:'official',source:source[origin].label,sourceUrl:sourceLinks[origin],adapted:!literalIds.has(id),t:source[origin].note+' Fila '+row+' del banco de preguntas.'+(!literalIds.has(id)?' Versión adaptada de una pregunta de examen; consultar fuente.':''),sourceRow:row,explanation:legalExplanations[concept]||'',explanation:legalExplanations[concept]||'',collection:'tema1-inicial'}));
 const created=[
  ['op-01','preambulo',1,'¿Qué función tiene el Preámbulo de la Constitución?',['Expresa las intenciones y fines que inspiran la Constitución.','Tiene el mismo valor que un artículo.','Regula la reforma constitucional.','Contiene las disposiciones transitorias.'],0,'practice'],
  ['op-02','fecha_31o',1,'El 31 de octubre de 1978 la Constitución fue:',['Aprobada por las Cortes.','Ratificada en referéndum.','Sancionada por el Rey.','Publicada en el BOE.'],0,'practice'],
  ['op-03','fecha_27d',1,'El 27 de diciembre de 1978 tuvo lugar:',['La aprobación por las Cortes.','La sanción y promulgación por el Rey.','La publicación en el BOE.','El referéndum.'],1,'practice'],
  ['op-04','fecha_29d',1,'El 29 de diciembre de 1978 la Constitución:',['Fue publicada en el BOE y entró en vigor.','Fue aprobada por el Congreso.','Fue ratificada en referéndum.','Fue sancionada por el Rey.'],0,'practice'],
  ['op-05','art3',1,'Según el artículo 3, el castellano es:',['Lengua oficial del Estado y todos tienen deber de conocerla y derecho a usarla.','La única lengua que puede ser oficial en España.','Una lengua cooficial solo en Madrid.','Una lengua sin protección constitucional.'],0,'practice'],
  ['op-06','art4',1,'¿Qué regula el artículo 4 de la Constitución?',['La bandera de España.','La capital del Estado.','La mayoría de edad.','La forma política del Estado.'],0,'practice'],
  ['op-07','art9_jerarquia',1,'La jerarquía normativa significa que:',['Una norma inferior no puede contradecir a una superior.','Toda norma posterior prevalece siempre.','Un reglamento puede modificar una ley.','Las leyes orgánicas prevalecen sobre la Constitución.'],0,'practice'],
  ['op-08','art12',1,'La mayoría de edad se alcanza a los:',['16 años.','18 años.','21 años.','25 años.'],1,'practice'],
  ['op-09','titulo2',1,'El Título II de la Constitución regula:',['La Corona.','Las Cortes Generales.','El Gobierno.','El Poder Judicial.'],0,'practice'],
  ['op-10','titulo3',1,'El Título III de la Constitución regula:',['Las Cortes Generales.','La Corona.','El Gobierno.','La reforma constitucional.'],0,'practice'],
  ['op-11','senado',1,'El Senado es:',['La Cámara de representación territorial.','El órgano de gobierno de los jueces.','La cámara que dirige el Gobierno.','Un tribunal constitucional.'],0,'practice'],
  ['op-12','gobierno_ejecutiva',2,'¿Quién ejerce la función ejecutiva y la potestad reglamentaria?',['El Gobierno.','Las Cortes Generales.','El Tribunal Constitucional.','El Rey.'],0,'practice'],
  ['op-13','tc_miembros',3,'El Tribunal Constitucional se compone de:',['9 miembros.','10 miembros.','12 miembros.','15 miembros.'],2,'practice'],
  ['op-14','tc_renovacion',3,'Los miembros del Tribunal Constitucional tienen un mandato de:',['6 años, renovables por mitad.','9 años, renovables por terceras partes cada 3 años.','4 años, renovables en bloque.','5 años, sin renovación.'],1,'practice'],
  ['op-15','reforma_167_referendum',4,'En la reforma ordinaria, el referéndum se celebra:',['Siempre.','Nunca.','Si lo solicita una décima parte de cualquiera de las Cámaras dentro de 15 días.','Solo si lo pide el Gobierno.'],2,'practice'],
  ['op-16','art1_soberania',1,'La soberanía nacional reside en:',['El Rey.','Las Cortes Generales.','El pueblo español.','El Gobierno.'],2,'exam'],
  ['op-17','art5',1,'La capital del Estado es:',['La Comunidad de Madrid.','La villa de Madrid.','Madrid, por ley orgánica.','La ciudad de Madrid, salvo reforma.'],1,'exam'],
  ['op-18','titulo4',2,'El Título IV regula:',['El Gobierno y la Administración.','Las relaciones entre el Gobierno y las Cortes Generales.','El Poder Judicial.','La Economía y Hacienda.'],0,'exam'],
  ['op-19','titulo5',2,'El Título V regula:',['Las relaciones entre el Gobierno y las Cortes Generales.','Las Cortes Generales.','La Corona.','El Tribunal Constitucional.'],0,'exam'],
  ['op-20','confianza',2,'La cuestión de confianza se entiende otorgada cuando obtiene:',['Mayoría absoluta del Congreso.','Mayoría simple del Congreso.','Tres quintos del Congreso.','Mayoría simple del Senado.'],1,'exam'],
  ['op-21','censura',2,'La moción de censura exige:',['Mayoría simple del Congreso y candidato alternativo.','Mayoría absoluta del Congreso e incluye candidato a la Presidencia.','Mayoría absoluta del Senado.','Dos tercios de ambas Cámaras.'],1,'exam'],
  ['op-22','supremo',2,'El Tribunal Supremo es:',['El intérprete supremo de la Constitución.','El órgano jurisdiccional superior en todos los órdenes, salvo garantías constitucionales.','El órgano de gobierno del Poder Judicial.','Una sala de las Cortes Generales.'],1,'exam'],
  ['op-23','tc_no_pj',3,'¿Qué afirmación es correcta sobre el Tribunal Constitucional?',['Forma parte del Poder Judicial.','Es el tribunal superior de todos los jueces.','Es el intérprete supremo de la Constitución y no forma parte del Poder Judicial.','Está formado por jueces del Tribunal Supremo.'],2,'exam'],
  ['op-24','art128',3,'Toda la riqueza del país, en sus distintas formas y cualquiera que sea su titularidad, está subordinada:',['Al interés general.','A la propiedad privada.','Al Gobierno.','A las Cortes Generales.'],0,'exam'],
  ['op-25','cuentas',3,'El Tribunal de Cuentas fiscaliza:',['Las cuentas y la gestión económica del Estado y del sector público.','Solo las cuentas de los ayuntamientos.','La constitucionalidad de las leyes.','La actividad de los jueces.'],0,'exam'],
  ['op-26','art148_149',3,'¿Qué relación es correcta?',['Art. 148: competencias exclusivas del Estado; art. 149: competencias autonómicas.','Art. 148: competencias que pueden asumir las comunidades autónomas; art. 149: competencias exclusivas del Estado.','Ambos artículos regulan las Cortes Generales.','Ambos artículos regulan la reforma constitucional.'],1,'exam'],
  ['op-27','titulos_capitulos',4,'¿Qué tres títulos se dividen en capítulos?',['I, III y VIII.','II, IV y VI.','I, V y X.','III, VII y IX.'],0,'exam'],
  ['op-28','disposiciones',4,'La Constitución contiene:',['4 adicionales, 9 transitorias, 1 derogatoria y 1 final.','9 adicionales, 4 transitorias, 1 derogatoria y 1 final.','4 adicionales, 9 transitorias, 1 final y 1 preámbulo.','10 disposiciones finales.'],0,'exam'],
  ['op-29','reforma_168',4,'En la reforma agravada, después de aprobarse el principio de reforma:',['Se disuelven inmediatamente las Cortes y hay nuevas elecciones.','Se convoca referéndum potestativo.','La reforma queda aprobada.','Interviene el Tribunal Supremo.'],0,'exam'],
  ['op-30','art140_alcaldes',3,'Según el artículo 140, los alcaldes serán elegidos:',['Por los concejales o por los vecinos, en los términos que establezca la ley.','Solo por los vecinos.','Solo por el Congreso.','Por el Gobierno.'],0,'exam']
 ].map(([id,concept,checkpoint,q,choices,correct,kind])=>({id,conceptId:'t1/'+concept,checkpoint,q,choices,correct,a:choices[correct],theme:1,type:kind,source:'OpoRadarCádiz',t:kind==='practice'?'Práctica didáctica creada por OpoRadarCádiz.':'Pregunta tipo examen creada por OpoRadarCádiz.',collection:'tema1-inicial'}));
 function prepared(items){return items.map(x=>({...x,trap:traps[x.id],blank:blanks[x.id]||x.blank,image:images[x.id],relation:relations[x.id]}));}
 function mode(name){
  if(name==='real')return official;
  if(name==='oporadar')return created;
  if(name==='mixto')return official.concat(created);
  return prepared(bank.filter(x=>name==='trampas'?x.id in traps:name==='completa'?x.id in blanks||x.blank:name==='visual'?x.id in images:name==='relacion'?x.id in relations:true));
 }
 return {bank,real:official,official,created,mode};
});
