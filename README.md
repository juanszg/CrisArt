# Cris Art

Sitio de portafolio y tienda para Cris Art, construido con Astro.

## Requisitos

- Node.js 22.12.0 o posterior
- npm

## Desarrollo

```sh
npm install
npm run dev
```

## Comandos

- `npm run dev`: servidor de desarrollo
- `npm run build`: genera el sitio estático en `dist/`
- `npm run preview`: sirve localmente la compilación
- `npm run check`: valida componentes Astro y TypeScript

## Organización

- `src/pages`: rutas
- `src/layouts`: estructura HTML compartida
- `src/components`: secciones y controles reutilizables
- `src/styles`: estilos globales
- `src/scripts`: comportamiento del menú, tienda, galería y carrito
- `src/data`: catálogo, eventos, galería y mapa de imágenes
- `public/img`: imágenes del sitio
- `legacy`: versión HTML original como referencia
