# Rutina Gym v2.1

V2.1 reorganiza la aplicación para que los ejercicios sean entidades completas y editables.

## Novedad principal: biblioteca de ejercicios

Cada ejercicio puede tener:

- Imagen propia.
- Tutorial de YouTube.
- Enlace externo adicional.
- Instrucciones.
- Notas.
- Descanso predeterminado.
- Rango objetivo de repeticiones.
- RIR objetivo.
- Grupo, subgrupo, equipamiento y músculos.

La imagen subida desde Ajustes se almacena como Blob en IndexedDB del navegador. Esto es importante: **una aplicación publicada en GitHub Pages no puede escribir físicamente nuevos archivos dentro del repositorio de GitHub**. Si quieres que una imagen forme parte del repositorio, puedes colocarla manualmente en `assets/exercises/` y asociarla al ejercicio mediante `imagePath`.

## Arquitectura

```text
rutina-gym-v2.1/
├── index.html
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
├── .gitignore
├── css/
│   └── app.css
├── assets/
│   └── exercises/
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

Se ha recuperado el catálogo de ejercicios existente en `Rutina-GYM .html`, conservando grupo, subgrupo, equipamiento, músculo principal y secundarios.

Ejercicios recuperados: **62**.

## GitHub Pages

1. Sube el contenido del proyecto al repositorio.
2. GitHub → Settings → Pages.
3. Deploy from branch → rama principal → `/ (root)`.
4. Accede a la URL publicada.

La aplicación no necesita servidor PHP ni base de datos externa.

## Datos y fotografías

Los datos de entrenamiento se guardan localmente en IndexedDB.

Las imágenes subidas desde la interfaz también se guardan localmente. La copia de seguridad JSON de la aplicación incluye estas imágenes como datos codificados, por lo que se pueden trasladar a otro navegador restaurando la copia.

Para imágenes versionadas directamente en GitHub, utiliza:

```text
assets/exercises/
```

y referencia después el archivo desde la ficha del ejercicio.

## Importante sobre la V2.1

Esta versión ya establece la arquitectura correcta para la biblioteca de ejercicios, pero la migración de sesiones antiguas del HTML original queda separada en `js/migration.js` para no alterar datos existentes sin confirmación.
