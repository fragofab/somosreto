# Playbook · Réplica literal de efectos web (Framer / Webflow / sitios compilados)

Metodología extraída de la réplica del hero 3D drum carousel de `framebloxpages.framer.website/landing/07` al proyecto RETO. Aplicable a cualquier efecto animado, sección 3D, marquee, parallax o componente de sitio compilado.

---

## Principio rector

**Extraer antes de interpretar.** Los sitios compilados (Framer, Webflow, builders) generan CSS con valores calculados por engines propietarios. Cualquier reinterpretación a "equivalentes razonables" rompe el efecto. La única réplica fiel es verbatim del DOM + stylesheet del sitio en vivo.

---

## Fase 1 · Auditoría (antes de tocar código)

**Paso 1.** Abre el sitio objetivo en Chrome con DevTools.

**Paso 2.** Identifica el componente exacto a replicar. No confundas el efecto visual con el mecanismo. Ejemplo: lo que parece "fotos flotando en círculo" puede ser un tambor 3D con 6 filas superpuestas rotadas, no un arco de cartas.

**Paso 3.** Determina el motor de animación antes de extraer valores. En la pestaña **Sources** busca referencias a librerías (Framer Motion, GSAP, Lenis, Lottie, Rive, Three.js). El motor dicta si la réplica será:
- **Modo A** — integrar la misma librería (requiere instalación).
- **Modo B** — reemplazar el driver JS con `@keyframes` CSS (si es una curva lineal simple).

**Paso 4.** Registra el tipo de motor y los nombres de clases principales. Las clases Framer siguen el patrón `framer-<hash>` — son tu ancla para mapear reglas CSS después.

---

## Fase 2 · Pausar para medir (crítico)

**Paso 1.** Abre la pestaña **Animations** de DevTools.

**Paso 2.** Pausa la animación (botón de pausa). Esto congela los transforms en un frame estable.

**Paso 3.** Inspecciona el elemento en movimiento con la animación pausada. Si no pausas, los valores de `Computed Styles` cambian cada frame y extraerás números inútiles.

**Paso 4.** Toma muestras del transform animado cada 500ms con la animación corriendo. Con dos muestras calculas velocidad angular o lineal:
- 3° cada 500ms = 6°/s = 60s por vuelta completa.
- Esto define tu `@keyframes` en Modo B (ejemplo: `animation: drum-spin 60s linear infinite`).

---

## Fase 3 · Extracción literal

**Paso 1.** Captura la estructura DOM verbatim con **Copy → Copy outerHTML** en el contenedor raíz del componente. No edites ni limpies — cada `data-framer-name`, cada clase, cada inline style puede ser load-bearing.

**Paso 2.** Captura el CSS desde la pestaña **Sources → Styles**, no desde Computed. Computed expande shorthand y resuelve variables; Styles te da las reglas originales del stylesheet. Busca en el sheet todas las reglas que referencien los nombres de clase del componente.

**Paso 3.** Capta específicamente:
- Todas las reglas con las clases del componente (suele ser 8–15 reglas).
- Bloques `@supports` (Framer los usa para overrides WebKit de gap → margin).
- Inline styles en cada elemento (los transforms 3D frecuentemente viven aquí, no en el stylesheet).

**Paso 4.** Captura las URLs de assets (imágenes, videos, fuentes). En Framer viven en `framerusercontent.com/images/<hash>.ext`. Copia las URLs originales en la primera iteración — reemplazas por assets propios al final.

**Paso 5.** Si el filtro de contenido bloquea strings largos con URLs tokenizadas, convierte el HTML en JSON tree sin atributos `src`/`srcset`, extráelo, y re-inyecta los src URL por separado.

---

## Fase 4 · Integración

**Paso 1.** Pega el HTML verbatim en tu documento destino. Conserva los nombres de clase originales (`framer-wf0kvx`, `framer-18sfqik`, etc.) — sirven como trazabilidad para debug posterior.

**Paso 2.** Pega las reglas CSS verbatim. No renombres clases, no refactorices shorthand, no conviertas `matrix3d()` a `rotateY()` aunque sepas la equivalencia (pueden diferir por `transform-origin` o precisión).

**Paso 3.** En Modo B, añade el `@keyframes` que reemplaza el driver JS. Regla única:
```css
@keyframes drum-spin {
  from { transform: perspective(600px) rotateY(0deg); }
  to   { transform: perspective(600px) rotateY(360deg); }
}
```
Aplica `animation: drum-spin 60s linear infinite` al mismo elemento que el driver JS original animaba (identifícalo por su `will-change: transform` y por ser objetivo del rAF loop).

**Paso 4.** Ajusta el ancestor posicional. Si el componente usa `position: absolute; top: Xpx; left: 50%; transform: matrix(1,0,0,1,-W/2,0)`, su padre debe ser `position: relative` con altura suficiente para contenerlo.

**Paso 5.** Elimina el JS del componente previo que estés reemplazando. No lo dejes colgado.

---

## Fase 5 · Verificación y ajustes finales

**Paso 1.** Abre el resultado en el navegador. Compara lado a lado con el sitio original. Las diferencias típicas al primer render:
- **Descentrado horizontal** — algún container intermedio con `width:100%` que no tiene `display:flex; justify-content:center` para centrar su hijo fijo.
- **Rotación errática** — filas con `flex-direction:column` en lugar de `position:absolute` superpuestas.
- **Cards viéndose "del lado equivocado"** — falta `rotateY(±90deg)` en los cards para invertir la rotación de la fila padre.
- **Performance baja** — falta `will-change: transform` o `transform-style: preserve-3d`.

**Paso 2.** Debug con `animation-play-state: paused` temporal en el elemento animado. Te permite inspeccionar la posición de cada pieza sin caos rotacional.

**Paso 3.** Prueba responsive. Componentes con widths fijos (1600px wrapper, 1200px escenario) requieren escalado via `transform: matrix(.85,0,0,.85,...)` en breakpoints, no cambio de widths — cambiar widths rompe la geometría 3D.

**Paso 4.** Reemplaza las URLs de assets originales por tus propios archivos (Cloudinary / hosting propio / framer mirror). Verifica que los aspect ratios coincidan con las dimensiones del card (ej: cards 280×400 → imágenes 2:3 o 3:4).

---

## Anti-patrones (lo que hizo fallar 2 iteraciones)

**No hagas.** Sustituir `matrix3d(0,0,-1,0,0,1,0,0,1,0,0,0,0,0,0,1)` por `rotateY(90deg)` sin verificar `transform-origin`. Aunque matemáticamente son equivalentes, el origen puede diferir.

**No hagas.** Usar `flex-direction: column` para apilar filas de un tambor 3D. Las filas deben ser `position: absolute` superpuestas, cada una con rotación distinta. El efecto drum es el resultado de 6 elementos en el mismo punto rotando 60° entre sí.

**No hagas.** Ignorar bloques `@supports`. Framer incluye overrides WebKit (Safari) para simular gap con margin. Sin ellos el spacing colapsa en Safari.

**No hagas.** Recalcular timings "al ojo". Si pausas y mides 3°/500ms, es 60s/vuelta — no 45s ni 90s.

**No hagas.** Descartar clases Framer como "basura generada". Son tu ancla de trazabilidad para debugging downstream.

---

## Checklist pre-entrega

- [ ] Estructura DOM verbatim
- [ ] Reglas CSS verbatim (incluye `@supports`)
- [ ] Inline styles conservados en cada elemento
- [ ] `@keyframes` con el timing exacto medido en DevTools
- [ ] Ancestor posicional con altura suficiente
- [ ] Centrado horizontal verificado en viewports 1920, 1440, 1200
- [ ] Escalado responsive por `transform: matrix()` en breakpoints
- [ ] JS del componente anterior eliminado
- [ ] Assets reemplazados por propios con aspect ratios correctos
- [ ] Performance hints: `will-change`, `preserve-3d`, `backface-visibility: hidden`
- [ ] Pausa en hover si aplica (`animation-play-state: paused`)
