# Centro de Entrenamiento Radar · Tema 1

El Centro reúne los juegos del Tema 1 bajo una sola dirección estable. No contiene códigos QR gráficos: se añadirán al libro únicamente tras confirmar la publicación y una prueba en móvil físico. La prueba de navegador móvil simulado no equivale a verificar un móvil físico.

## Contrato reutilizable

Cada actividad lleva `theme`, `checkpoint`, `id`, `conceptId` y `type`. El ID de concepto es compartido entre representaciones; el ID de actividad es único. Ejemplo: `t1/tc_fuera` aparece en tarjetas, trampas, completar, visual y Express. El fallo de cualquiera modifica la prioridad de las demás.

Checkpoint 1: Preliminar + I–III. 2: IV–VI. 3: VII–IX. Final: X + disposiciones y estructura completa. `scope` filtra por tema y checkpoint; «solo lo nuevo» exige igualdad de checkpoint. El repaso acumulativo admite todos los anteriores. Nunca rellena una ronda con elementos fuera de la zona.

## Persistencia

`oporadar_concepts_v1` guarda contadores de acierto, duda, fallo, última respuesta, fecha, racha y modalidad. Lectura corrupta o acceso bloqueado no impide jugar; se advierte que no persistirá. Ningún historial anterior se elimina.

Las tarjetas existentes conservan su motor y sesión. Se añade un puente que registra los resultados en el almacén común y consulta sus prioridades. El Centro utiliza la misma clave y origen. No se comparten automáticamente datos entre localhost y GitHub Pages, navegadores o dispositivos.

El test antiguo de Google Sheet sigue separado hasta disponer de `concepto` y `checkpoint` revisados en cada fila. No se debe adivinar esa clasificación. El Centro usa una selección provisional y revisada de 60 preguntas del Tema 1: 30 oficiales (10 de 2026) y 30 creadas por OpoRadar. Cada pregunta oficial conserva organismo, año y referencia de fuente; no compromete aún la selección definitiva de las 600 preguntas ni el futuro extra de preguntas.

## Modalidades visibles

El alumno ve cinco puertas de entrada claras:

1. **Tarjetas Radar** · recordar datos y respuestas.
2. **Caza la trampa** · detectar afirmaciones incorrectas.
3. **Completa la norma** · recuperar palabras literales clave.
4. **Mapa constitucional** · situar títulos, artículos e instituciones.
5. **Test Tema 1 · selección mixta** · mezcla de preguntas oficiales y creadas por OpoRadar.

**Traduce el jurídico** permanece como juego independiente: explica expresiones difíciles en lenguaje sencillo sin sustituir las Tarjetas Radar.

El motor conserva adaptadores internos adicionales para reutilización futura. Toda sesión permite 20, 30 o 40 preguntas cuando el bloque dispone de ellas, no repite ID durante la sesión y prioriza los conceptos con dudas o fallos.

Puente de solo lectura del Sheet: exige columnas `concepto` (ID t1/...), `checkpoint` (1–4), `revisada` (SI), `organismo`, `anio` y los campos anteriores. Solo importa OFICIAL con fuente HTTPS y clasificación explícita revisada. El test antiguo registra conceptos clasificados en la memoria común y consulta su prioridad. Las filas antiguas sin concepto conservan su historial propio y no se clasifican por suposiciones. La conexión pública falló en la comprobación de este turno: la pantalla indica que usa el banco local. No se han modificado celdas, permisos ni publicado archivos.

Pendientes: acceso público al banco, clasificación revisada de las filas, pruebas en móvil físico y revisión editorial de la apertura antes de modificar más páginas.

## Integración de otros temas

El núcleo de memoria y filtros no depende del Tema 1. Cada tema debe aportar su banco, bloques y dibujos. Todos los adaptadores consultan el mismo `conceptId` canónico, sin análisis automático del texto jurídico ni creación de preguntas oficiales.

## Verificación

`verify_center_radar.cjs`: 4 checkpoints × 10 modos internos × 3 tamaños, alcance, unicidad, persistencia transversal y almacenamiento bloqueado.
`verify_cards_radar.cjs`: pruebas anteriores de las 40 tarjetas permanecen válidas.
`verify_center_mobile.cjs`: interacciones de los cinco modos visibles en navegador a 390 px, recarga, origen común, ausencia de errores y desbordamiento. La prueba de un móvil físico sigue pendiente.
