# RETO — Contexto completo del proyecto web
> Última actualización: 2026-06-04

---

## 1. Sobre la iglesia

| Campo | Valor |
|---|---|
| Nombre | **RETO** (Reconciliación Total) |
| Tipo | Comunidad cristiana |
| Ciudad | Guadalajara, México |
| Tagline | "Donde las relaciones se reconcilian, las vidas se transforman y los discípulos se multiplican" |
| Versículo ancla | 2 Corintios 5:20 — "Embajadores de reconciliación" |
| WhatsApp | +52 33 1152 2916 |

---

## 2. Branding

### Logos
- `Logo RETO.png` — versión base en blanco (para fondos oscuros)
- `Logos Reto/Logo RETO 2026-05.png` — versión mayo 2026
- `Logos Reto/Logo RETO 2026-06.png` — versión vigente (junio 2026)

### Paleta de colores
```css
--navy-900: #141a2d    /* color dominante / fondo oscuro */
--navy-800: #1b2337
--navy-700: #2f324e
--navy-500: #484c6f
--peach-400: #f2c5a3   /* acento cálido principal */
--peach-300: #f7d7bd
--gold:      #e3be78   /* acento dorado secundario */
--gold-light:#f0d298
--mint-400:  #bcd9c3   /* acento frío de soporte */
--mint-300:  #d1e4d4
--cream-50:  #fefaf3   /* fondo claro más sutil */
--cream-100: #fbf3e7   /* fondo de página principal */
--cream-200: #f5e7db
--silver-100:#e8e9ee
--silver-200:#cfd1da
```

### Gradientes de marca
```css
--grad-navy-peach: radial-gradient(120% 90% at 0% 0%, #f2c5a3 0%, #a5887e 22%, #3b3d55 55%, #141a2d 100%)
--grad-silver-cream: linear-gradient(115deg, #cfd1da 0%, #e0dfe2 45%, #f4eadd 100%)
--grad-pill: linear-gradient(90deg, #f2c5a3 0%, #bcd9c3 100%)       /* peach → mint */
--grad-accent: linear-gradient(100deg, #a5887e 0%, #e3be78 40%, #f2c5a3 100%)
```

### Tipografía (sistema actual v14+)
| Rol | Familia | Peso | Notas |
|---|---|---|---|
| Display / headings | **Fraunces** | 300–400 | Variable, optical size 9–144; estilo editorial |
| Body / UI | **Inter** | 300–600 | System fallback sans-serif |

Escala tipográfica con `clamp()`:
```css
h1: clamp(2.6rem, 6vw, 5.25rem) / weight 300 / letter-spacing -.035em
h2: clamp(2.1rem, 4.4vw, 3.75rem) / weight 300 / letter-spacing -.03em
h3: clamp(1.4rem, 2.4vw, 2rem) / weight 400 / letter-spacing -.02em
eyebrow: 0.6875rem / weight 500 / uppercase / letter-spacing .22em
```

### Sistema de radii
```css
--r-xs: 10px   --r-sm: 14px   --r-md: 20px
--r-lg: 28px   --r-xl: 40px   --r-pill: 999px
```

### Easing functions
```css
--e-out:    cubic-bezier(.22, 1, .36, 1)
--e-soft:   cubic-bezier(.16, 1, .3,  1)
--e-spring: cubic-bezier(.34, 1.56, .64, 1)
```

---

## 3. Archivos de diseño (print)

| Archivo | Descripción |
|---|---|
| `01_Reto Trifold Front_A/B/C.jpg` | Portada del tri-fold, 3 variantes de diseño |
| `02_Reto Trifold Back_A/B/C.jpg` | Reverso del tri-fold, 3 variantes |
| `01_Reto Trifold Front_Print.pdf` | PDF listo para impresión (portada) |
| `02_Reto Trifold Back_Print.pdf` | PDF listo para impresión (reverso) |
| `Links/` | Archivos vinculados de InDesign/AI (PSDs, ilustraciones) |
| `Reto Branding.png` | Guía de identidad visual |

---

## 4. Landing page — historial de versiones

### Versión inicial (landing-reto.html)
- Primera iteración generada sin referencia visual aplicada
- Layout estático: hero dark, nav con logo invertido, marquee horizontal de fotos (Unsplash)
- Problema: ignoró la referencia Frameblox/07 — demasiado genérico

### Sesión "Analyze design reference and create HTML"
- Primer intento de replicar `framebloxpages.framer.website/landing/07`
- Confusión inicial: se intentó primero como cilindro 3D, luego como marquee plano
- Iteraciones v1 → v3 con distintos enfoques de carousel
- Descubrimiento clave: el efecto correcto no es marquee lineal ni cilindro — es un **drum 3D** (6 filas en tambor) con curva tipo "U" abierta

### Sesión "Extract literal code from Framer website"
- Se usó **Chrome MCP** para extraer el DOM + CSS verbatim del sitio Framer en producción
- Extracción literal de:
  - `outerHTML` del contenedor `.framer-ux3tlg-container`
  - 10 reglas CSS del stylesheet (sin modificar)
  - Análisis de dependencias: Framer Motion, React interno, runtime `events.framer.com`
- Hallazgo crítico: la animación `rotateY` del `.framer-18sfqik` es **JS puro de Framer Motion** (no hay `@keyframes` — se muta frame a frame vía `rAF`). No es portable directamente.
- Arquitectura del componente documentada: 6 "rows" con `rotateY` fijo (0°/30°/60°/90°/120°/150°) cada uno con 2 cards hijas `rotateY(±90°)`, `280×400px`, `border-radius:20px`, `backface-visibility:hidden`
- Los archivos de extracción se guardaron inicialmente en `ITJ/Extractions/` (error de carpeta) y luego movidos a RETO

### Sesión "Extract and replicate carousel animation styles" (v4–v5)
- Problema con v3: las fotos salían demasiado hacia adentro — debían casi tocar los bordes del drum
- Solución: **wrapper 1600px fijo centrado** (igual que la referencia Framer)
  - `width:1600px; left:50%; transform:matrix(1,0,0,1,-800,0)`
- `mask-image` horizontal con stops exactos del CSS source: `19.72% / 80%`
- Sin overlays externos — la máscara del wrapper hace el fade lateral
- Responsive: matrix translate compensado para escalar a 85% (tablet) y 65% (móvil)
- Animación: `@keyframes drum-spin` reemplaza el Framer Motion JS
  ```css
  @keyframes drum-spin {
    from { transform: perspective(600px) rotateY(0deg); }
    to   { transform: perspective(600px) rotateY(360deg); }
  }
  animation: drum-spin 64s linear infinite; /* en el .framer-18sfqik */
  ```

### Sesión "Redesign landing page layout" (v6–v13)

**v6–v10:** Refinamientos del carousel, ajustes de layout hero, múltiples experimentos de composición.

**v11 — Enfoque Finovate:**
- Fuente única: **Work Sans** con clamp + letter-spacing negativo
- Sistema radii completo: `--r-pill 100px`, `--r-sm 12px`, `--r-lg 28px`, `--r-xl 36px`
- Nav flotante pill con backdrop-blur, inversión al scroll
- Hero con esquinas inferiores redondeadas, CTA pill con arrow-rotate, eyebrow con pulse-dot
- Fundamentos: cards cream-3 con hover lift + border gold
- Servicios: items con hover → card blanco + icono rotado -15°
- Quote: wrapper rounded 36px (efecto "carta")
- Contacto: cards individuales por item, mapa con radius 36px
- Footer: wrapper rounded 36px

**v12 — Split asimétrico + Bento:**
- Hero split 1.35:1: headline izquierda, tile gradiente navy→peach derecha
- Carousel 3D drum → sección propia separada del hero
- Scripture ribbon: marquee horizontal con versículo sobre gradiente navy→peach (42s)
- Bento asimétrico: 5 cards con proporciones diferentes, gradientes por card
- Ministerios sticky scroll (estilo Finovate): columna izquierda sticky con contador, columna derecha con 5 cards activadas por IntersectionObserver + barras de progreso
- Animaciones: parallax en hero-right, reveal staggered con delays

**v13 — Editorial Magazine (exploración):**
- Triple stack tipográfico: **Playfair Display 900** (display) + **Source Serif 4** (cuerpo) + **JetBrains Mono** (metadata)
- Drop cap 5.4em via `::first-letter`, pull quotes con rule 2px
- Bento asimétrico con rules duras 2px (no gradientes suaves)
- Captions `FIG. 01 — …`, marcadores `§ 01`, `№ 01`
- Ministerios sticky: índice en números romanos (i./ii./iii./iv./v.)
- Footer con masthead tipo revista + colophon tipográfico
- **Nota:** esta dirección no se continuó — se descartó a favor del sistema Fraunces+Inter

### Sesión "Analyze video and fix image cropping" (v11 refinado)
- Continuación de ajustes al approach Finovate antes de cambiar a v12+

### Versión consolidada v14 → v19

A partir de **v14** se establece el design system definitivo que combina:
- Hero centrado estilo Frameblox/07 + drum carousel verbatim (v8/v5)
- Paleta y gradientes de v12 (navy-peach, silver-cream, pill)
- Tipografía Fraunces + Inter
- Scroll-triggered reveals con stagger
- Contacto con mapa iframe + panel navy flotante
- WhatsApp integración

| Versión | Cambio principal |
|---|---|
| v14 | Consolidación definitiva: hero centrado + drum + paleta v12 + contacto con mapa |
| v15 | Nav pill centered fix (`justify-content:center`) |
| v16 | Refinamientos de spacing y layout |
| v17 | Array `CAROUSEL_PHOTOS` para gestión de las 12 fotos del drum por slots |
| v18 | WhatsApp FAB (botón flotante sticky), sección "Visita" (`#visit`) |
| v19 | Ajustes finales; base para `_deploy_v19/` |

**`_deploy_v19/index.html`** = versión de producción (sin número de versión en título, `<meta name="robots" content="noindex, nofollow">`)

---

## 5. Estructura de la landing (estado actual — v19)

```
<nav>           Pill flotante centrado, navy permanente, backdrop-blur
<section#top>   Hero: headline centrado + drum 3D carousel
<section#fundamentos>  3 fundamentos de la iglesia
<section#ministerios>  Split sticky: panel foto + accordion de ministerios
<section#contacto>     Mapa + panel navy con info de contacto
<section#visit>        "Te esperamos" — CTA con WhatsApp
<footer>        Logo, nav links, redes sociales
<a.fab-whatsapp>  FAB de WhatsApp (sticky, visible al hacer scroll)
```

### Secciones en detalle

**Nav**
- Pill flotante `width: min(750px, calc(100% - 48px))`
- Grid 3 columnas: nav-left | logo-center | nav-right
- Logo: `Logo RETO.png` (blanco) a 55px de alto
- Links: Comunidad / Ministerios / Contacto (izquierda) + Visita (derecha)
- Mobile: hamburger → panel cream con blur

**Hero**
- Fondo: `--cream-100` con dot-grid pattern sutil
- Eyebrow animado con pulse-dot
- H1 en Fraunces: "Donde las relaciones se reconcilian"
- Sub: tagline completo
- CTAs: pill "Únete a RETO" (navy) + link "Conoce más →"
- Drum 3D carousel debajo del copy

**Drum 3D Carousel**
- DOM verbatim de Framer (clases `framer-*` preservadas)
- 6 rows × 2 cards = 12 slots de foto
- Wrapper: `framer-n7oh7a` → `1200px wide, 500px height, overflow:hidden`
- Animación: `.framer-18sfqik` → `@keyframes drum-spin 64s linear infinite`
- Fotos: gestionadas vía array JS `CAROUSEL_PHOTOS` (12 slots)
- Specs de foto: 7:10 vertical, cards 280×400px, border-radius 20px

**Fundamentos (3 cards)**
1. Reconciliar Relaciones
2. Transformar Vidas
3. Multiplicar Discípulos

**Ministerios (sticky scroll)**
- Panel izquierdo sticky: foto + título que cambian por IntersectionObserver
- Panel derecho: accordion / cards por ministerio
- Título de sección: "Servicio en Comunidad"
- Incluye: Grupo para Jóvenes + otros ministerios

**Contacto**
- Mapa: iframe de Google Maps con filtro grayscale
- Panel navy flotante con: dirección, horarios, teléfono/WhatsApp, correo
- WhatsApp: `https://wa.me/523311522916`

**Visita**
- CTA de cierre: "Te esperamos"
- Foto de la comunidad
- Botón WhatsApp

---

## 6. Archivos de exploración por sección

| Archivo | Contenido |
|---|---|
| `reto-ministerios-opciones.html` | 3 propuestas de layout para sección ministerios con fotografía |
| `reto-contacto-opciones.html` | Opciones de diseño para sección contacto |
| `reto-visita-opciones.html` | 6 propuestas para sección "Te esperamos" |
| `reto-footer-propuestas.html` | Footer propuesta 1 |
| `reto-footer-propuestas-v2.html` | Footer propuesta 2 |
| `reto-footer-propuestas-v3.html` | Footer propuesta 3 (minimal) |
| `preview-gradients.html` | Preview de la paleta de gradientes |
| `hero-3d-carousel.html` | Componente drum carousel aislado |

---

## 7. Drum Carousel — especificaciones técnicas

### Arquitectura DOM (verbatim Framer)
```
.framer-ux3tlg-container       → contenedor flex, 600px height
  .framer-SrCqw.framer-n7oh7a  → 1200px wide, 500px, overflow:hidden
    .framer-18sfqik             → JS-animated slider (rotateY dinámico)
      .framer-1j38ets           → "Circle": padre estático de los 6 rows
        .framer-jqyyw2          → Row 01: rotateY(90deg)
        .framer-ybx3e6          → Row 02: rotateY(120deg)
        .framer-bfxn5x          → Row 03: rotateY(150deg)
        .framer-80t3x0          → Row 04: rotateY(180deg)
        .framer-ce9hg6          → Row 05: rotateY(60deg)
        .framer-f1eujk          → Row 06: rotateY(30deg)
```

Cada row: `width:1400px, height:400px, position:absolute, transform-style:preserve-3d`
Cada card: `width:280px, height:400px, border-radius:20px, backface-visibility:hidden`

### CSS crítico
```css
/* Wrapper externo */
.framer-SrCqw.framer-n7oh7a {
  width: 1200px;
  height: 500px;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 19.72%,
    black 80%,
    transparent 100%
  );
}

/* Animación reemplazando Framer Motion */
@keyframes drum-spin {
  from { transform: perspective(600px) rotateY(0deg); }
  to   { transform: perspective(600px) rotateY(360deg); }
}
.framer-18sfqik {
  animation: drum-spin 64s linear infinite;
  transform-style: preserve-3d;
}

/* @supports WebKit (gap → margin) — NO omitir */
@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) {
  .framer-SrCqw.framer-n7oh7a,
  .framer-SrCqw .framer-18sfqik,
  .framer-SrCqw .framer-1j38ets { gap: 0px; }
  /* ... margin compensations ... */
}
```

### Sistema de fotos (CAROUSEL_PHOTOS)
- 12 slots numerados (`01.jpg` → `12.jpg`)
- Specs: 7:10 aspect ratio, mín. 560×800px, máx. 120KB/archivo
- Carpeta: `photos/carousel/` (requiere ser poblada con fotos reales)
- Formato preferido: `.webp` (calidad 80) + fallback `.jpg` (calidad 82)

### Responsive del carousel
```css
/* 1280px — scale matrix para contener en viewport */
transform: matrix(.95, 0, 0, .95, 0, 0);

/* 900px (tablet) */
transform: matrix(.85, 0, 0, .85, 0, 0);

/* 600px (mobile) */
transform: matrix(.65, 0, 0, .65, 0, 0);
```
**Regla:** NO cambiar widths — usar `transform:matrix()` para escalar. Cambiar widths rompe la geometría 3D.

---

## 8. Playbook: réplica literal de efectos Framer/Webflow

Documento completo en: `PLAYBOOK-replica-literal-framer.md`

**Principio rector:** Extraer antes de interpretar. Los sitios compilados generan CSS con valores calculados por engines propietarios.

**Fases:**
1. **Auditoría** — identificar componente + motor de animación en Sources (Framer Motion, GSAP, Lenis, etc.)
2. **Pausar para medir** — DevTools Animations → pausar → extraer transforms con animación congelada
3. **Extracción literal** — Copy outerHTML verbatim, CSS desde Sources (no Computed), URLs de assets
4. **Integración** — HTML/CSS verbatim, @keyframes reemplaza JS solo si es curva lineal simple
5. **Verificación** — comparar lado a lado en 1920/1440/1200, responsive con matrix()

**Anti-patrones documentados:**
- Sustituir `matrix3d()` por `rotateY()` sin verificar `transform-origin`
- Usar `flex-direction:column` para apilar filas de un drum (deben ser `position:absolute`)
- Ignorar bloques `@supports` (WebKit Safari gap workarounds)
- Recalcular timings "al ojo" en lugar de medir en DevTools

---

## 9. Fotos de la iglesia disponibles

| Archivo | Descripción |
|---|---|
| `Links/_DSC7691.jpg` | Fotografía de la iglesia |
| `Links/DSC03343.jpg` | Fotografía de la iglesia |
| `Links/AdobeStock_314069876.jpeg` | Stock photo (Adobe) |
| `Links/Servicios.png` | Imagen de servicios |
| `Links/mic-narra-RA3f0b26qwE-unsplash.psd` | Foto micrófono (Unsplash, PSD) |
| `Links/Quienes somos.psd` / `_B.psd` | Sección "Quiénes somos" |
| `Links/Ministerios.psd` | Foto ministerios |
| `Links/Couple.psd` / `YoungMan.psd` / `YoungWoman.psd` | Personas de la congregación |
| `photos/carousel/` | **Carpeta para las 12 fotos del drum** (vacía — pendiente poblar) |

---

## 10. Pendientes / próximos pasos

- [ ] **Fotos reales del drum carousel** — poblar `photos/carousel/` con 12 fotos de la congregación (7:10, mín. 560×800px). Ver `photos/carousel/README.md` para specs completas.
- [ ] **Hosting / deploy** — `_deploy_v19/index.html` está listo. Requiere hosting + dominio para RETO.
- [ ] **Fotos en sección ministerios** — reemplazar placeholder por fotos reales de cada ministerio.
- [ ] **Foto sección "Te esperamos"** — imagen de comunidad propia (actualmente Unsplash).
- [ ] **Google Maps embed** — verificar que el iframe apunte a la dirección correcta de la iglesia.
- [ ] **SEO básico** — una vez en producción, quitar `noindex,nofollow` del `_deploy_v19/index.html`.
- [ ] **Open Graph / Social sharing** — agregar `og:image`, `og:title`, etc.
- [ ] **Analytics** — Google Analytics o equivalente.

---

## 11. Stack y entorno

- HTML/CSS/JS vanilla — sin frameworks ni bundlers
- Google Fonts: Fraunces + Inter (preconnect configurado)
- Sin dependencias npm para el frontend
- `finovate/` — tema WordPress de referencia (Finovate/VamTam) usado como inspiración de componentes y animaciones, no como base del proyecto

---

## 12. Lecciones aprendidas del proceso

1. **Las referencias visuales son el brief de diseño.** Cuando se da una URL, el primer paso es inspeccionarla con Chrome MCP, no asumir estructura genérica.
2. **Framer Motion no es portable como CSS.** La animación rotateY del drum es JS puro — se reemplazó por `@keyframes` CSS con timing medido en DevTools (64s → 3°/500ms medido).
3. **El drum no es un cilindro — es una "U" abierta.** 6 rows a 30° de separación, cada uno con 2 cards, wrapper 1200px con overflow:hidden + mask-image para el fade lateral.
4. **@supports WebKit es crítico.** Sin el bloque de fallback `gap → margin`, el spacing colapsa en Safari.
5. **Responsive del drum: solo matrix, no widths.** Cambiar widths rompe la geometría 3D preserve-3d.
6. **Iterar por sección en archivos separados** antes de integrar a la versión principal — ver archivos `*-opciones.html`.
