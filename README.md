# CONURBANO LEYENDS — Sitio oficial

Sitio estático creado con HTML, CSS y JavaScript puro. Está preparado para publicarse con GitHub Pages.

## Estructura

- `index.html`: contenido y secciones del sitio.
- `css/estilos.css`: diseño adaptable, animaciones y estilos.
- `js/main.js`: menú móvil, modal de acceso, visor de escenarios, formularios y animaciones.
- `assets/escenarios/`: imágenes de escenarios proporcionadas para el proyecto.
- `assets/marca/`: recursos gráficos de Compa Studios.

## Probar localmente

Abrí `index.html` en un navegador. Para trabajar cómodamente, también podés abrir la carpeta en Visual Studio Code y usar Live Server.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub.
2. Subí el contenido de esta carpeta (el archivo `index.html` debe quedar en la raíz).
3. Entrá en **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**.
5. Seleccioná `main` y la carpeta `/ (root)`, guardá y esperá la publicación.

## Antes de publicar

- En `js/main.js`, completá `correoDestino` con el correo oficial para que el formulario pueda preparar un email dirigido al equipo.
- Cuando tengan el juego compilado, copiá el archivo a una carpeta pública del proyecto (por ejemplo `descargas/`) y cambiá el enlace y el estado del botón `#botonDescarga` en `index.html`.
- Reemplazá el bloque de teaser en `index.html` por el video o iframe del teaser cuando esté disponible.
- Las pantallas de inicio de sesión y registro son demostrativas. Para cuentas reales se necesita un backend y una base de datos; esta web estática no guarda contraseñas ni crea usuarios.

## Créditos

Proyecto estudiantil de videojuego independiente desarrollado por el equipo de Conurbano Leyends / Compa Studios.
