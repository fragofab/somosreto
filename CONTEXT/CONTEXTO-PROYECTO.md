# RETO — Contexto completo del proyecto web
> Última actualización: 2026-06-05

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
- `Logo-RETO-2026-No-slogan.png` — versión vigente sin slogan (nav)
- `logos/Logo-RETO-2026-05.png` — versión mayo 2026 (footer)

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
--grad-pill: linear-gradient(90deg, #f2c5a3 0%, #bcd9c3 100%)
--grad-accent: linear-gradient(100deg, #a5887e 0%, #e3be78 40%, #f2c5a3 100%)
```

### Tipografía
| Rol | Familia | Peso | Notas |
|---|---|---|---|
| Display / headings | **Fraunces** | 300–400 | Variable, optical size 9–144 |
| Body / UI | **Inter** | 300–600 | System fallback sans-serif |

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

## 3. Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | **Astro** (static output) |
| Lenguaje | **TypeScript** (strict) |
| Package Manager | **pnpm v11** |
| Testing E2E | **Playwright** (Chromium + Firefox + WebKit + Mobile) |
| Testing Unit | **Vitest** |
| CI/CD | **GitHub Actions** |
| Hosting PRE-PROD | **GitHub Pages** (temporal, beta/demo) |
| Hosting PROD | **Por definir** — dominio `somosreto.com` (~fin de semana 2026-06-14) |
| Node.js | v24 |

### Repositorio
- URL: `https://github.com/fragofab/reto-website`
- Branch principal: `main`
- Deploy automático: push a `main` → GitHub Actions → GitHub Pages
- URL pre-prod (beta): `https://fragofab.github.io/reto-website`
- URL producción final: `https://somosreto.com` (pendiente compra de dominio/host)

### Estrategia de hosting — decisión pendiente
GitHub Pages sirve como **pre-prod/beta** solamente. Para producción con dominio propio hay dos opciones:

**Opción A — GitHub Pages + Custom Domain (más simple):**
- Comprar dominio `somosreto.com` en cualquier registrar (Namecheap, Google Domains, GoDaddy)
- Apuntar DNS a GitHub Pages
- Agregar el dominio en Settings → Pages → Custom domain
- **Costo:** solo el dominio (~$15 USD/año) — el hosting sigue siendo gratis
- **Ventaja:** cero cambios en el código, solo configuración DNS
- **Desventaja:** limitado a sitios estáticos (sin servidor)

**Opción B — Hosting propio (Cloudflare Pages, Netlify, Vercel):**
- Conectar el repo de GitHub al proveedor elegido
- Deploy automático en cada push
- **Costo:** gratis en tier básico, ~$20/mes en Pro
- **Ventaja:** más control, funciones serverless si se necesitan en el futuro (formularios, auth para CMS)
- **Recomendación:** **Cloudflare Pages** — gratis, rápido, y si compramos el dominio en Cloudflare Registrar el DNS se configura automáticamente

**→ Decisión recomendada: Opción A si el sitio se mantiene estático. Opción B (Cloudflare Pages) si vamos a agregar Decap CMS con autenticación o formularios de contacto.**

### Impacto en el código al cambiar de dominio
El único cambio necesario en `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://somosreto.com',
  base: '/',  //← quitar el /reto-website
  output: 'static',
});
```
Y eliminar la lógica `isProd` — con dominio propio siempre es `/` como base.

### Estructura del proyecto
```
reto-website/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Actions → GitHub Pages
│       └── test.yml            # Playwright en PR
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro          # Hero + drum carousel 3D
│   │   ├── Fundamentos.astro   # 3 pilares
│   │   ├── Ministerios.astro   # Accordion sticky
│   │   ├── Contacto.astro      # Mapa + panel navy
│   │   ├── Visit.astro         # CTA visit
│   │   ├── Footer.astro
│   │   └── FabWhatsapp.astro   # Floating WhatsApp button
│   ├── layouts/
│   │   └── BaseLayout.astro    # HTML base, fonts, meta, CSS tokens
│   ├── pages/
│   │   └── index.astro         # EPIC-001: Main page
│   └── utils/
│       └── asset.ts            # Helper centralizado para rutas de assets
├── public/
│   ├── Logo-RETO-2026-No-slogan.png
│   ├── Discipulado.jpg
│   ├── Reto-Comunidad-Photo.jpg
│   ├── logos/
│   │   └── Logo-RETO-2026-05.png
│   └── photos/
│       ├── carousel/           # 12 slots para drum carousel (01-12)
│       ├── pilares/            # 01-reconciliacion, 02-transformacion, 03-discipulado
│       └── ministerios/        # 01-servicio-comunidad ... 05-grupo-varones
├── tests/
│   ├── e2e/
│   │   └── home.spec.ts        # Smoke tests
│   └── unit/
├── CONTEXT/
│   ├── CONTEXTO-PROYECTO.md
│   └── PLAYBOOK-replica-literal-framer.md
├── astro.config.mjs
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Configuración crítica

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://fragofab.github.io',
  base: isProd ? '/reto-website' : '/',
  output: 'static',
});
```

### asset() helper — src/utils/asset.ts
```typescript
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
```
**Uso:** `asset('photos/pilares/01-reconciliacion.jpg')` — resuelve rutas locales con BASE_URL correcto en dev y prod.

---

## 5. Drum Carousel — especificaciones técnicas

### Arquitectura DOM (verbatim Framer)
```
.framer-wf0kvx                 → wrapper externo 1600px, mask-image fade lateral
  .framer-ux3tlg-container     → 840px height
    .framer-n7oh7a             → flex row, overflow visible
      .framer-18sfqik          → JS-animated slider (@keyframes drum-spin)
        .framer-1j38ets        → "Circle": padre de los 6 rows
          .framer-jqyyw2       → Row 01: rotateY(90deg)
          .framer-ybx3e6       → Row 02: rotateY(120deg)
          .framer-bfxn5x       → Row 03: rotateY(150deg)
          .framer-80t3x0       → Row 04: rotateY(180deg)
          .framer-ce9hg6       → Row 05: rotateY(60deg)
          .framer-f1eujk       → Row 06: rotateY(30deg)
```

### Animación
```css
@keyframes drum-spin {
  from { transform: perspective(600px) rotateY(0deg) }
  to   { transform: perspective(600px) rotateY(360deg) }
}
.framer-18sfqik {
  animation: drum-spin 60s linear infinite;
  transform-style: preserve-3d;
}
```

### Sistema de fotos (CAROUSEL_PHOTOS)
- 12 slots en `Hero.astro` → array `CAROUSEL_PHOTOS`
- Fotos actuales: framerusercontent.com (placeholders temporales)
- Slot 01: `photos/carousel/01` (local, pendiente foto real)
- Specs reales: 7:10 aspect ratio, mín. 560×800px, máx. 120KB

### Bug conocido — Safari
- El drum carousel se ve lineal en Safari (se ve correcto en Chrome)
- Causa: Safari aplana 3D cuando hay `overflow: hidden` en ancestros
- Status: **Pendiente** → registrado en backlog como STORY-SAF-001

---

## 6. EPICs y Stories

### EPIC-001: Main Page (Landing)
| Story | Descripción | Status |
|---|---|---|
| STORY-001 | Setup inicial repo (Astro + TS + Playwright) | ✅ Done |
| STORY-002 | Migrar index.html v19 a Astro (componentes) | ✅ Done |
| STORY-003 | GitHub Actions deploy a GitHub Pages | ✅ Done |
| STORY-004 | Poblar carousel con fotos reales de la congregación | ⏳ Pending |
| STORY-005 | SEO básico (meta, OG tags, quitar noindex) | ⏳ Pending |
| STORY-006 | Analytics (Google Analytics 4) | ⏳ Pending |
| STORY-SAF-001 | Fix drum carousel en Safari | ⏳ Pending |
| STORY-CSS-001 | Renombrar clases framer-* a nombres semánticos | ⏳ Pending |
| STORY-PAR-001 | Reimplementar parallax Visit con Intersection Observer | ✅ Fixed — se eliminó el parallax del photo-bg. La foto se muestra correctamente en su sección. Parallax puede reintroducirse en el futuro con IO si se desea el efecto. |

### EPIC-002: Blog
| Story | Descripción | Status |
|---|---|---|
| STORY-007 | Diseño layout blog listing | ⏳ Pending |
| STORY-008 | Diseño layout blog post | ⏳ Pending |
| STORY-009 | Sistema de contenido (Markdown/MDX) | ⏳ Pending |
| STORY-010 | Primer post de prueba | ⏳ Pending |

### EPIC-003: Live Page
| Story | Descripción | Status |
|---|---|---|
| STORY-011 | Diseño página en vivo | ⏳ Pending |
| STORY-012 | Embed YouTube/Facebook Live | ⏳ Pending |
| STORY-013 | Estado "offline" cuando no hay transmisión | ⏳ Pending |

### EPIC-004: News Page
> Página de anuncios semanales donde se publica de qué va a tratar la prédica del domingo. El contenido llega actualmente por WhatsApp cada semana.

**Decisión de arquitectura (2026-06-05):**
- El responsable inicial es Fabián, pero debe poder publicar **cualquier persona sin conocimientos técnicos** — desde el pastor hasta un voluntario
- Interfaz simple tipo CMS: sin tocar código, sin GitHub, sin Markdown
- **Approach recomendado: [Decap CMS](https://decapcms.org/) (antes Netlify CMS)** — open source, se integra con Astro + GitHub, genera una interfaz web en `/admin` donde cualquiera puede crear/editar posts con un formulario visual. Los posts se guardan como archivos Markdown en el repo automáticamente.
- Alternativa si Decap CMS resulta complejo: **[Tina CMS](https://tina.io/)** — visual editing directamente sobre la página

| Story | Descripción | Status |
|---|---|---|
| SPIKE-001 | Research: Evaluar Decap CMS vs Tina CMS para flujo de publicación no-técnico. Criterios: facilidad de setup con Astro + GitHub Pages, autenticación (quién puede publicar), interfaz para usuario no técnico, costo. | ✅ Resuelto → usar Decap CMS |
| STORY-N01 | Setup Decap CMS en el repo (config, interfaz /admin, autenticación GitHub) | ⏳ Pending |
| STORY-N02 | Diseño layout News listing | ⏳ Pending |
| STORY-N03 | Diseño card de anuncio semanal con: tema de la prédica, versículo, fecha, pastor | ⏳ Pending |
| STORY-N04 | Capacitación — guía de uso para publicar un anuncio sin conocimientos técnicos | ⏳ Pending |

### EPIC-005: Social Media Integration
> Investigar si los posts de Facebook e Instagram de RETO pueden alimentar automáticamente el blog/news de la página, eliminando trabajo duplicado de publicación.

| Story | Descripción | Status |
|---|---|---|
| SPIKE-002 | Research: Integración Facebook/Instagram → Blog. Evaluar: **Meta Graph API** (requiere app aprobada, token de larga duración), **RSS/Atom feeds** (Facebook tiene feed público limitado), **Zapier/Make webhooks** (no-code, más simple), **embed nativo** (iframes de FB/IG, sin control de diseño). Definir: ¿queremos sincronización automática o curación manual? ¿Quién tiene acceso a la página de FB/IG de RETO? | ⏳ Pending |
| STORY-S01 | Implementar integración elegida (pendiente resultado SPIKE-002) | ⏳ Pending |
| STORY-S02 | Diseño de cards de post social en el blog | ⏳ Pending |

### EPIC-006: Enhancements
| Story | Descripción | Status |
|---|---|---|
| STORY-E01 | Responsive para pantallas grandes (2560px+, 4K) — el contenido se ve pequeño en monitores grandes. Investigar solución con `clamp()`, breakpoints `min-width` y escalado del carousel 3D que tiene widths fijos en px. | ⏳ Pending |

### EPIC-007: QA & Testing
| Story | Descripción | Status |
|---|---|---|
| STORY-014 | Playwright smoke tests (home, blog, live) | 🔄 In Progress |
| STORY-015 | Visual regression tests | ⏳ Pending |
| STORY-016 | Accessibility audit (axe-core) | ⏳ Pending |

---

## 7. Lecciones aprendidas del proceso

1. **Astro style scoping rompe clases dinámicas.** Las clases generadas por JS (drum carousel) no reciben el atributo `data-astro-cid-*` — solución: `<style is:global>` en Hero.astro.
2. **BASE_URL en Astro no incluye slash final.** Al concatenar rutas siempre agregar `/` explícito o usar el helper `asset()`.
3. **Parallax con `translate3d` en elementos `position: absolute` — NO hacerlo.** Causa que el elemento se salga de su sección contenedora y aparezca en secciones superiores, especialmente en producción. El bug no aparece en local porque Vite/HMR ejecuta el JS después del layout; en builds estáticos el JS corre antes. **Solución rápida: eliminar `data-parallax` del elemento.** Solución correcta futura: usar Intersection Observer para calcular el parallax solo cuando la sección es visible.
4. **`overflow: hidden` + `preserve-3d` en Safari.** Safari aplana el 3D cuando cualquier ancestro tiene overflow hidden — bug conocido del browser.
5. **`define:vars` en Astro elimina TypeScript.** Al usar `<script define:vars={{ base }}>` el script pierde tipado estricto — usar solo para pasar variables del servidor al cliente cuando es necesario.
6. **GitHub Pages requiere repo público** para el plan gratuito. La página no es indexable porque tiene `noindex, nofollow`.
7. **Playwright en CI usa `npm run preview`** no `npm run dev` — el dev server tarda demasiado en CI y causa timeout.
9. **Migración de npm a pnpm.** pnpm es más rápido, eficiente en disco y más estricto con dependencias. Al migrar: eliminar `node_modules` y `package-lock.json`, correr `pnpm install`, aprobar build scripts con `pnpm approve-builds` (esbuild y sharp lo requieren). En GitHub Actions usar `pnpm/action-setup@v4` y `cache: 'pnpm'`.

---

## 8. Pendientes / próximos pasos

- [ ] **Fotos reales del carousel** — 12 fotos de la congregación (7:10, mín. 560×800px) → `public/photos/carousel/`
- [ ] **Fix Safari drum carousel** — STORY-SAF-001
- [ ] **Renombrar clases framer-*** — STORY-CSS-001
- [ ] **Parallax Visit con Intersection Observer** — STORY-PAR-001
- [ ] **EPIC-002 Blog** — arrancar en próxima sesión
- [ ] **EPIC-003 Live Page** — después del blog
- [ ] **SEO** — quitar noindex, agregar OG tags
- [ ] **Google Maps** — verificar dirección correcta
- [ ] **Analytics** — GA4

---

## 9. Archivos fuente originales
Ubicación local: `/Users/fabiandelgadofragoso/Documents/RETO/PaginaRetoDavid/reto-landing-v19-deploy`

| Archivo | Descripción |
|---|---|
| `index.html` | Landing v19 original (base de la migración) |
| `Logo-RETO-2026-No-slogan.png` | Logo nav |
| `Logos Reto/Logo RETO 2026-05.png` | Logo footer |
| `photos/carousel/` | Slots del drum (vacíos — pendiente fotos reales) |
| `photos/pilares/` | 3 fotos de pilares |
| `photos/ministerios/` | 5 fotos de ministerios |
| `Reto-Comunidad-Photo.jpg` | Foto comunidad (sección Visit) |
| `Discipulado.jpg` | Foto discipulado (ministerios) |