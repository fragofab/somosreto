import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://fragofab.github.io',
  base: isProd ? '/reto-website' : '/',
  output: 'static',
});