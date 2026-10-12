# Traduce el Jurídico · propuesta local

30 tarjetas del Tema 1. Juego distinto de Tarjetas Radar. No publicado y sin QR definitivo. Banco completo revisable en `propuesta.html`, sin añadir esas definiciones al libro impreso.

## Selección y comprobación

Cada tarjeta incluye expresión, pregunta, una explicación de 1–3 frases, advertencia opcional, tema, checkpoint, concepto compartido y referencia normativa. Los términos se han contrastado con el Tema 1 vigente y la Constitución publicada por el BOE. El carácter de intérprete supremo del Tribunal Constitucional se comprueba además en el artículo 1 de su ley orgánica. Poder Legislativo/Ejecutivo y órgano jurisdiccional se incluyen porque son necesarios para comprender las funciones ya explicadas en el tema. Jerarquía normativa y arbitrariedad se añaden porque aparecen en su artículo 9.3.

La inviolabilidad tiene distintos sentidos: esta tarjeta se limita expresamente al domicilio (18.2), sin extender sus reglas al Rey o a los diputados. Sancionar se limita a aprobar formalmente una ley. Amparo no se presenta como recurso para todos los derechos. Tutela no implica ganar un caso. Mayoría absoluta cuenta los miembros, no solo votantes. Las simplificaciones son ayudas de comprensión, no sustitutos del texto normativo ni de las tarjetas técnicas.

## Memoria común

Usa `../shared/progress.js` y `oporadar_concepts_v1`. Lo entendí → acierto; Tengo dudas → duda; No lo entendí → fallo. El mismo concepto conserva su ID cuando coincide con Radar; no se comparte artificialmente el ID de conceptos diferentes. Una valoración refleja comprensión autodeclarada, no una prueba objetiva de memorización. El botón de difíciles consulta la última valoración común, por lo que otros modos pueden actualizar ese estado.

Selección ponderada sin repetición, una tarjeta por vez y filtro de difíciles. Ante almacenamiento bloqueado/corrupto se avisa y se permite jugar en memoria. No se borran historiales existentes. El progreso es local a navegador/origen/dispositivo; localhost no se sincroniza con GitHub Pages.

## Otros temas

Añadir entradas conservando `id`, `theme`, `conceptId`, `q`, `a`, `bold`, `ref`, `coverage`, `think` y `warning`. Temas y opción «Todos los temas» se construyen desde el banco. Si se reutiliza una idea ya existente, conservar el ID canónico del concepto. No renombrar tarjetas antiguas para ampliar el banco. Las palabras adicionales se revisan antes de publicarse; no hay generación automática de definiciones.

## Libro y comprobaciones

Solo se modifica la página 27, con un bloque de 101 puntos de alto y reserva gráfica, sin enlace/QR. Maestro conserva 32 páginas y sus dos carillas finales. Nivel 2 permanece intacto. `verify_translator.cjs` recorre 30 tarjetas a 320 y 390 píxeles, comprueba giro, recortes, ausencia de repeticiones, guardado y recarga, dudas/fallos, filtro difícil y almacenamiento bloqueado. Falta revisión de la usuaria y prueba física antes de publicar.
