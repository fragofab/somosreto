# RETO Website — Claude Code Brief

> Copia este archivo a la raíz de `somosreto/` antes de iniciar Claude Code.
> Este archivo es leído por el orquestador y por todos los subagentes.

---

## Proyecto

Sitio web de **RETO Comunidad Cristiana** (Guadalajara, México).
Repo: `https://github.com/fragofab/somosreto`
Pre-prod: `https://fragofab.github.io/somosreto`
Producción objetivo: `https://somosreto.com`

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Astro | 5.x |
| Lenguaje | TypeScript (strict) | — |
| Package manager | pnpm | v11 |
| Node.js | — | v24 |
| Testing E2E | Playwright | Chromium + Firefox + WebKit + Mobile |
| Testing Unit | Vitest | — |
| CI/CD | GitHub Actions | — |

---

## Comandos esenciales

```bash
pnpm install          # instalar dependencias
pnpm dev              # servidor local (dev)
pnpm build            # build estático
pnpm preview          # preview del build (usado en CI)
pnpm test             # Playwright E2E
pnpm test:unit        # Vitest unit tests
```

---

## Convenciones obligatorias

### Archivos
- Componentes Astro en `PascalCase.astro`
- Utilidades TypeScript en `camelCase.ts`
- Estilos globales en `src/styles/`
- Assets estáticos en `public/`

### TypeScript
- Strict mode activado — no usar `any`
- Props de componentes Astro siempre tipadas con `interface Props`
- Usar el helper `asset()` de `src/utils/asset.ts` para TODAS las rutas de assets
  ```typescript
  import { asset } from '../utils/asset';
  // Correcto:   asset('photos/carousel/01.jpg')
  // Incorrecto: '/photos/carousel/01.jpg'  ← rompe en GitHub Pages
  ```

### CSS
- Usar variables de `BaseLayout.astro` (tokens de marca RETO)
- CSS scoped en componentes Astro por defecto
- Clases dinámicas generadas por JS → usar `<style is:global>`
- NO usar `transform: translate(-50%, -50%)` junto con animaciones fadeInUp — usar `translate: -50% -50%` (propiedad individual CSS)

### Rutas y BASE_URL
- `astro.config.mjs` usa `isProd ? '/somosreto' : '/'`
- Siempre usar `asset()` — nunca hardcodear rutas absolutas
- Para el overlay de alabanza en OBS (localhost:8080): las rutas son `http://localhost:8080/` — esto es correcto solo para la versión local. La versión Astro usa `asset()`

---

## Paleta de colores RETO

```css
--navy-900: #141a2d   /* fondo oscuro dominante */
--navy-800: #1b2337
--navy-700: #2f324e
--navy-500: #484c6f
--peach-400: #f2c5a3  /* acento cálido principal */
--peach-300: #f7d7bd
--gold:      #e3be78  /* acento dorado secundario */
--gold-light:#f0d298
--mint-400:  #bcd9c3  /* acento frío de soporte */
--mint-300:  #d1e4d4
--cream-50:  #fefaf3
--cream-100: #fbf3e7
```

Gradientes:
```css
--grad-navy-peach: radial-gradient(120% 90% at 0% 0%, #f2c5a3 0%, #a5887e 22%, #3b3d55 55%, #141a2d 100%)
--grad-pill: linear-gradient(90deg, #f2c5a3 0%, #bcd9c3 100%)
--grad-accent: linear-gradient(100deg, #a5887e 0%, #e3be78 40%, #f2c5a3 100%)
```

---

## Tipografía

| Rol | Familia | Peso |
|---|---|---|
| Display / headings | Fraunces | 300–400 |
| Body / UI | Inter | 300–600 |

---

## Estructura de componentes relevante

```
src/
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Fundamentos.astro
│   ├── Ministerios.astro
│   ├── Contacto.astro
│   ├── Visit.astro
│   ├── Footer.astro
│   ├── FabWhatsapp.astro
│   └── live/                    ← EPIC-003 (en construcción)
│       ├── LiveEmbed.astro
│       ├── OfflineState.astro
│       └── alabanza/            ← Overlay para momentos de alabanza
│           ├── AlabanzaOverlay.astro
│           ├── CountdownCard.astro
│           ├── MainCard.astro
│           ├── FarewellCard.astro
│           ├── Background.astro
│           ├── VerseBar.astro
│           ├── CameraFrame.astro
│           └── AudioPlayer.astro
├── layouts/
│   └── BaseLayout.astro         ← HTML base, fonts, meta, tokens CSS
├── pages/
│   ├── index.astro              ← Landing principal
│   ├── en-vivo.astro            ← Página de transmisión en vivo (STORY-011)
│   └── alabanza-overlay.astro   ← Standalone para OBS (sin nav/footer)
└── utils/
    └── asset.ts
```

---

## Lecciones técnicas críticas (NO repetir estos errores)

1. **`overflow: hidden` + `preserve-3d` en Safari** aplana el 3D — bug conocido. Fix: evitar overflow hidden en ancestros de elementos 3D.
2. **Parallax con `translate3d` en `position: absolute`** — NO hacerlo. Causa que el elemento se salga de su contenedor en builds estáticos. Usar Intersection Observer.
3. **`define:vars` en Astro elimina TypeScript** — usar solo cuando sea estrictamente necesario pasar variables del servidor al cliente.
4. **Clases dinámicas JS en Astro** no reciben el atributo `data-astro-cid-*` — usar `<style is:global>`.
5. **Crossfade de gradientes CSS** — `transition: background` no interpola `radial-gradient`. Usar dos capas con `opacity` transition.
6. **`transform` shorthand + `fadeInUp` keyframes** — conflicto. Usar propiedad individual `translate`.

---

## EPICs y estado actual

| EPIC | Nombre | Estado |
|---|---|---|
| EPIC-001 | Main Page (Landing) | 🔄 En progreso |
| EPIC-002 | Blog | ⏳ Pending |
| EPIC-003 | Live Page | ⏳ Pending — en construcción |
| EPIC-004 | News Page | ⏳ Pending |
| EPIC-005 | Social Media Integration | ⏳ Pending |
| EPIC-006 | Enhancements | ⏳ Pending |
| EPIC-007 | QA & Testing | 🔄 En progreso |

---

## Instrucciones para subagentes

### Subagente: Implementación
- Seguir todas las convenciones de este documento
- Usar `asset()` para todas las rutas
- TypeScript strict — no `any`
- CSS scoped por defecto, `is:global` solo para clases dinámicas
- Revisar lecciones técnicas antes de escribir código

### Subagente: QA / Testing
- Playwright para E2E: `pnpm test`
- Vitest para lógica JS pura: `pnpm test:unit`
- Todo componente nuevo necesita al menos un smoke test en `tests/e2e/`
- El overlay de alabanza tiene estado interno (countdown, cards, audio) — probar transiciones entre estados
- Revisar que `asset()` resuelve correctamente en dev (`/`) y prod (`/somosreto/`)
- Verificar en los 4 browsers: Chromium, Firefox, WebKit (Safari), Mobile

### Subagente: Security Review
- Verificar que no hay URLs hardcodeadas con `localhost` en código Astro (solo en el HTML legacy para OBS)
- El overlay de alabanza sirve audio desde `public/audio/` — verificar que los archivos MP3 están en public y no en src
- No hay inputs de usuario en el overlay — superficie de ataque mínima
- Revisar que no hay `innerHTML` sin sanitizar en scripts del overlay
- Para la Live Page: el embed de YouTube/Facebook debe ser solo `<iframe>` con `src` controlado — no ejecutar URLs externas sin validar

### Subagente: Code Review
- Verificar que no hay lógica duplicada entre componentes del overlay
- El estado del overlay (qué card mostrar) debe vivir en `AlabanzaOverlay.astro` — los cards son presentacionales
- Verificar que los tokens CSS de `alabanza-tokens.css` extienden (no duplican) los tokens de `BaseLayout.astro`
- El `AudioPlayer` debe ser independiente del card que lo contiene
- Revisar que `FarewellCard` limpia sus timers (`clearInterval`, `clearTimeout`) al desmontarse

---

## Rutas locales importantes

| Recurso | Ruta local |
|---|---|
| Repo somosreto | Buscar con: `find ~/Documents -name "astro.config.mjs"` |
| Assets overlay (MP3, logos, HTML) | `/Users/fabiandelgadofragoso/Documents/RETO/OBS Musica/` |
| Fuente original landing v19 | `/Users/fabiandelgadofragoso/Documents/RETO/PaginaRetoDavid/reto-landing-v19-deploy` |

El HTML del overlay se llamaba `ServicioDominicalReto.html` y será renombrado a `alabanza-overlay.html`.
Copiar a `CONTEXT/alabanza_pausa_reference.html` solo como referencia — no forma parte del build Astro.

---

El flujo completo del domingo:
1. OBS apunta a `https://somosreto.com/alabanza-overlay` (o `localhost:8080` en local)
2. La página `/en-vivo` de SomosReto embebe el stream de YouTube Live
3. Cuando hay momentos de alabanza, OBS activa la escena con el overlay
4. El overlay muestra countdown → card principal (con música royalty-free) → despedida
5. La migración de Facebook Live a YouTube Live es gradual — el componente `LiveEmbed` debe soportar ambos

### Assets de audio (royalty-free, Pixabay)
Ya copiados en `public/audio/alabanza/` (9 archivos):
- `alanajordan-gospel-instrumental-01-383531.mp3` (7.4 MB)
- `jesuschristisgod-christian-rock-for-jesus-christ-always-301257.mp3` (6.8 MB)
- `harmony-of-heaven-worship-gospel-christian-church-music-491941.mp3` (6.4 MB)
- `mosthigh-powerful-christian-worship-song-354391.mp3` (8.7 MB)
- `ikoliks_aj-gospel-worship-christian-church-music-391977.mp3` (4.3 MB)
- `denis-pavlov-music-worship-piano-instrumental-peaceful-prayer-music-223373.mp3` (18 MB)
- `jesuschristisgod-instrumental-guitar-worship-to-jesus-301253.mp3` (4.2 MB)
- `jesuschristisgod-instrumental-piano-christian-worship-of-jesus-301250.mp3` (5.5 MB)
- `misselle-around-jericho-joshua-6-instrumental-498104.mp3` (5.7 MB)

### Assets de imágenes del overlay
Ya copiados en `public/images/` (4 archivos):
- `public/images/logo-reto-corner.png` ← Logo.png (52 KB) — logo esquina OBS
- `public/images/logo-reto-card.jpeg` ← Logo_Reto.jpeg (26 KB) — logo card principal
- `public/images/logo-reto-solo.jpeg` ← Logo_solo.jpeg (21 KB) — logo sin texto
- `public/images/reto-versiculo.png` ← RETO Versiculo.png (350 KB) — imagen con versículo


## Instrucción de mantenimiento

Al terminar cada sesión de trabajo, actualiza este CLAUDE.md con:
- Nuevas lecciones técnicas descubiertas
- Stories que cambiaron de estado
- Assets nuevos agregados a public/
- Decisiones de arquitectura tomadas

Esto garantiza continuidad entre sesiones sin depender de historial de chat.