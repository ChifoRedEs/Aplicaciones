# Rutina Gym — versión modular para GitHub Pages

Aplicación web/PWA para registrar entrenamientos de gimnasio. Esta versión separa HTML, CSS, JavaScript y catálogo de ejercicios para poder mantener una biblioteca de ejercicios con imágenes y tutoriales.

## Biblioteca de ejercicios

En **Ajustes → Gestionar ejercicios → Editar ficha** cada ejercicio puede tener:

- Imagen subida desde el móvil/PC.
- Ruta de imagen versionada en GitHub (`./assets/exercises/...`).
- Tutorial de YouTube.
- Otro enlace externo.
- Instrucciones y notas.
- Descanso predeterminado.
- Repeticiones objetivo y RIR objetivo.

Las imágenes que se suben desde la interfaz se guardan localmente en IndexedDB como datos de imagen. GitHub Pages no puede escribir archivos nuevos dentro del repositorio. Si quieres que una imagen viaje con el proyecto, colócala en `assets/exercises/` y asigna su ruta en la ficha.

## Arquitectura

```text
rutina-gym/
├── index.html
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
├── .gitignore
├── assets/
│   └── exercises/
├── css/
│   └── app.css
├── data/
│   └── exercises.js
└── js/
    ├── app.js
    ├── backup.js
    ├── data.js
    ├── db.js
    ├── exercise-manager.js
    ├── migration.js
    ├── state.js
    ├── stats.js
    ├── timer.js
    ├── ui.js
    └── workouts.js
```

## Catálogo

Se conserva el catálogo recuperado del HTML original: **62 ejercicios**.

## Desplegar en GitHub Pages

1. Descomprime el ZIP.
2. Sube **todo el contenido** al repositorio, no solo `index.html`.
3. Comprueba que en la raíz del repositorio aparecen `index.html`, `css/`, `js/` y `data/`.
4. En GitHub: **Settings → Pages → Deploy from a branch → rama principal → `/ (root)`**.
5. Espera al despliegue y abre la URL de Pages.

La aplicación no necesita PHP, Node ni base de datos externa.

## Datos

Los entrenamientos, personalizaciones de ejercicios y las imágenes subidas desde la interfaz se almacenan en IndexedDB del navegador. La copia JSON incluye esos datos.

## Nota

La migración automática de sesiones antiguas del HTML original todavía está separada en `js/migration.js`; no se ejecuta automáticamente para evitar alterar datos sin confirmación.
