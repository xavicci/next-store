npx create-next-app@latest --ts iniciar un proyecto.

# TOP Levels Folders

Son usadas para organizar nuestra aplicacion y recuros estaticos:
app App Router
pages Pages Router
public Static assets to be served
src Optional application source folder

** CLASE2 Resumen 25/02/2024**

# TOP LEVELS FILES

Son usadas para configurar nuestra aplicacion, manejar dependencias, correr middleware, integrar herramientas de monitoreo y definir variables de entorno.
next.config.js Configuration file for Next.js
package.json Project dependencies and scripts
instrumentation.ts OpenTelemetry and Instrumentation file
middleware.ts Next.js request middleware
.env Environment variables
.env.local Local environment variables
.env.production Production environment variables
.env.development Development environment variables
.eslintrc.json Configuration file for ESLint
.gitignore Git files and folders to ignore
next-env.d.ts TypeScript declaration file for Next.js
tsconfig.json Configuration file for TypeScript
jsconfig.json Configuration file for JavaScript

# APP ROUTING CONVENTIONS

Dentro del App router pueden existir estos archivos especiales:
layout Layout
page Page
loading Loading UI
not-found Not found UI
error Error UI
global-error Global error UI
route endpoint
template Re-rendered layout
default Parallel route fallback page

- Pero adicionalmente ofrece otros features como:

  [x] Nested Routes
  [ ] Dynamic Routes
  [x] Route Groups and Private Folders
  [x] Parallel and Intercepted Routes
  [x] Metadata File Conventions
  [x] Open Graph and Twitter Images
  [x] SEO

  Ref: [Estructura del Proyecto](https://nextjs.org/docs/getting-started/project-structure)

# CLASE4 Resumen 26/02/2024

## Terminologia

![alt Terminologia](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-component-tree.png&w=1080&q=75&dpl=dpl_7tjrijDcFMxGoJxk1b7WXz5Pav3C)Terminologia del routing

- Tree: El que define una estructura jerarquica comunmente se llama Root (Nodo Mayor).
- Subtree: Parte del Tree, empienza un nuevo nodo hijo. Si se lo toma como referencia de estructura jerarquica este nodo se lo llamaria Root, pudiendo tener un subtree.
- Root: El primer nodo en un tree o subtree
- Left: Nodo en un subtree que no tiene hijos y en el ultimo segmento en el path del URL
- URL Segment: Parte del URL delimitado por el slash '/'
- URL Path: Parte del URL que viene despues del dominio.

## App router

Trabaja en el directorio llamado src/app. Es una nueva característica que facilita la creación de aplicaciones web con una estructura de navegación más intuitiva y flexible a traves de archivos brindando una "navegacion inteligente" y manejando redirecciones/metadatos.

Este directorio trabaja a lo largo del directorio "PAGES" que permite incrementar su adopcion.
Esto le permite optar por algunas rutas de su aplicación en el nuevo comportamiento, manteniendo otras rutas en el directorio de "Pages" para el comportamiento anterior. (Al parecer existe una version anterior al app router llamada page router, pudiendo convivir ambas sin problemas).
Por defecto todos los componentes dentro del "APP" _son react server components_ que luego podemos convertirlos en _client components_.

El app router tomara prioridad sobre el page router.

### ROLES DE FOLDERS Y FILES

Los folder son usadas para definir rutas.

![alt route_segments](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-segments-to-path-segments.png&w=1080&q=75&dpl=dpl_7tjrijDcFMxGoJxk1b7WXz5Pav3C)Segmento de Rutas

### RUTAS ANIDADAS

Para crear rutas anidadas, se puede agregar una carpeta dentro de otra carpeta.

### CONVENCIONES DE ARCHIVOS

Sigue obivamente las mismas que APP ROUTING

### JERARQUIA DE COMPONENTES

Se renderizan de acuerdo a la siguiente especificidad de archivos especiales:

- layout.js
- template.js
- error.js (React error boundary)
- loading.js (React suspense boundary)
- not-found.js (React error boundary)
- page.js or nested layout.js

Adiccional a los archivos especiales, podemos poner nuestros propios archivos ya sean componentes, estilos,etc debido a que mientras los folder definen rutas, solo los "page.tsx y route.jsx" son publicamente accesibles.

Entonces el archivo especial page.tsx es usado para hacer segmentaciones de rutas accesibles y no existe problema es colocar un archivo "page.tsx" en cada segmento de ruta.

Algo importante a considerar es que los "layout.tsx" muestran UI que es compartida en multiples rutas.

## TIPOS DE RUTAS

Existen dos tipos de rutas: estáticas y dinamicas.

Las estáticas son las que colocamos en nuestro folder y agregamos el page.tsx.

### Rutas dinámicas

Son usadas cuando queremos crear segmentos de rutas pero a traves de datos dinámicos, al momento del request se generan o se prerenderizan al momento de la compilacion.

Los segmentos dinamicos son pasados como props "params" a layout, page, route y generateMetadata.

Su convención es envolver al folder en brackets cuadrados [mi_nueva_ruta]

```
  Route                           Example URL       params
  app/blog/[slug]/page.js         /blog/a           { slug: 'a' }
```

Tambien existe la posibilidad de generar Params para el segmento a traves de la función generateStaticParams(), cuyo beneficio principal es que los tiempos de build disminuyan ya que los Layout and Page se crearan solo una vez.

Los segmentos dinámicos pueden ampliarse para abarcar todos los segmentos posteriores añadiendo una elipsis dentro de los brackets [...nombrecarpeta].

- Por ejemplo:
  ```
  Route                           Example URL       params
  app/shop/[...slug]/page.js      /shop/a           { slug: ['a'] }
  app/shop/[...slug]/page.js      /shop/a/b         { slug: ['a', 'b'] }
  app/shop/[...slug]/page.js      /shop/a/b/c       { slug: ['a', 'b', 'c'] }
  ```

Los segmentos Catch-all pueden hacerse opcionales incluyendo el parámetro entre brackets dobles: [[...nombrecarpeta]].

- Por ejemplo:

  ```
  Route                           Example URL       params
  app/shop/[[...slug]]/page.js	  /shop	            {}
  app/shop/[[...slug]]/page.js	  /shop/a	          { slug: ['a'] }
  app/shop/[[...slug]]/page.js	  /shop/a/b	        { slug: ['a', 'b'] }
  app/shop/[[...slug]]/page.js	  /shop/a/b/c	      { slug: ['a', 'b', 'c'] }
  ```

  Al utilizar TypeScript, puede añadir Types para los "Params" en función del segmento de ruta configurado.

- Por ejemplo:
  ```
  Route                               params - Type Definition
  app/blog/[slug]/page.js	            { slug: string }
  app/shop/[...slug]/page.js	        { slug: string[] }
  app/shop/[[...slug]]/page.js	      { slug?: string[] }
  app/[categoryId]/[itemId]/page.js	  { categoryId: string, itemId: string }
  ```

# CLASE5 Resumen 26/02/2024

Los archivos especiales layout, pages y templates permiten crear un UI para una ruta.

## LAYOUT

Un Layout es un UI que es compartido entre multiples rutas, pueden preserva su estado, seguir siendo interactivos y no se vuelven a re-renderizar. Recordar que cuando usamos layout es obligatorio aceptar la prop _"children"_ para que pueda ser compartida con otros componentes.

Por ejemplo, el layout sera compartido con /dashboard y /dashboard/settings pages.
![alt layout](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Flayout-special-file.png&w=1080&q=75&dpl=dpl_HKaTZdkuaarspU2J2iNiqNmkbJqv)

### ROOT LAYOUT

Es todo aquello que siempre va a estar presente en la aplicacion y sin importar que cambies de pagina se va a visualizar como por ejemplo el header, el footer, alguna barra de navegación específica y suele haber diferentes tipos de layout para cada parte de la aplicación. Por lo general se ubica en el folder /app y solo él puede contener etiquetas <html> y <body>.
No es posible pasar datos entre un layout padre y sus hijos. Sin embargo, puedes obtener los mismos datos en una ruta más de una vez, y React deducirá automáticamente las solicitudes sin afectar al rendimiento.

### LOCAL LAYOUT o NESTING LAYOUTS

Este puede ir ubicado dentro de cada segmento de ruta que vayamos anidando reflejando un comportamiento del root layout pero respetando los niveles jerarquicos de los layouts superiores.

## PAGES

Una "PAGE.TSX" es un UI que es unico en una ruta y puede existir en cada folder, ademas pueden hacer fetch a la data del lado del servidor dado que por defecto son server components.
