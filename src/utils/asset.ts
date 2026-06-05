/**
 * Resuelve la ruta de un asset considerando el BASE_URL de Astro.
 * Uso: asset('photos/carousel/01.jpg')
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}