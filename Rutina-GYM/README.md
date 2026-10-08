# Rutina Gym V2.3

Aplicación web estática para GitHub Pages. No necesita Node, npm, Vite ni servidor backend.

## Despliegue

Sube **todo el contenido de esta carpeta** a la raíz del repositorio de GitHub Pages, manteniendo las carpetas:

- `index.html`
- `css/`
- `js/`
- `data/`
- `assets/`
- `manifest.json`
- `sw.js`

La aplicación carga primero el **calendario mensual**. Desde un día se puede crear una sesión de Empuje, Tracción o Pierna, seleccionar ejercicios y registrar las series.

## Biblioteca de ejercicios

En **Ajustes → Gestionar ejercicios** se puede editar cada ejercicio y asignar:

- imagen subida desde el móvil/PC;
- ruta de imagen para una imagen incluida en `assets/exercises/`;
- tutorial de YouTube;
- enlace externo;
- instrucciones;
- descanso;
- repeticiones objetivo;
- RIR objetivo.

Las imágenes subidas se guardan localmente en el navegador mediante IndexedDB cuando está disponible.

## Datos

Los entrenamientos se guardan localmente en el navegador. La copia JSON incluye sesiones, personalizaciones, sobreescrituras de ejercicios e imágenes almacenadas localmente.

## Importante

Si sustituyes una versión anterior de la aplicación, haz una recarga completa del sitio. La V2.3 usa una caché de Service Worker independiente (`rutina-gym-v2-3`).
