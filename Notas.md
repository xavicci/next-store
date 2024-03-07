npx create-next-app@latest --ts iniciar un proyecto.
el que codea es un developer,
el que codea y piensa es un Ingeniero,
y el que codea, piensa y ama lo que hace es un verdadero Artista.


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

Algo importante a considerar es que los "template.tsx" muestran UI que es compartida en multiples rutas.

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

# CLASE5 Resumen 28/02/2024

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

## TEMPLATES

Muy similar a los layouts en la forma que envuelven a los layout hijos o las pages.

A diferencia de los layouts que persiten en las rutas y mantienen estados, los templates crean una nueva instancia para cada uno de sus hijos en la navegación, en otras palabras cuando navegas entre templates se monta la nueva instancia del componente, se recrea los elementos del DOM, no guarda estados y se vuelven a sincronizar sus efectos.

    - Casos de uso:
        - Caracteristicas que usen useEffect (logging pages) y useState (pagina de formularios de comentarios)

El Template component debe incluir el children prop.

```
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

## METADATA

En el app directory, existe el archivo "page" en el que puedes modificar elementos del tag "head" como title y meta usando los metadata apis.

La metada puede ser definida exportando el objeto "metadata" o la funcion generateMetadata en un archivo layout o page.

# CLASE6 01/03/2024 LINKING AND NAVIGATING
 
Como el routing y la navegación trabaja?

Existen cuatro formas de navegar entre rutas:

```
    - <Link> Component
    - <useRouter> hook (client components)
    - <redirect> function (server components)
    - Usando "History API"
```

## LINK COMPONENT

Componente incorporado en Next, similar a \<a>, es la opcion recomendada a usar, se puede usar atributos como className.

```
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

Este componente tiene la siguientes props

```
Prop	    Example	            Type	            Required
href	    href="/dashboard"   String or Object    Yes
replace	    replace={false}     Boolean	            -
scroll	    scroll={false}      Boolean	            -
prefetch    prefetch={false}    Boolean or null     -
```

Para saber si un link esta activo se puede usar el hook usePathnamme().
Si desea desplazarse a un id específico en la navegación, puede anexar su URL con un enlace hash # o simplemente pasar un enlace hash a la prop href. Esto es posible ya que \<Link> se convierte en un elemento \<a>.

```
    <Link href="/dashboard#settings">Settings</Link>

    // Output
    <a href="/dashboard#settings">Settings</a>
```

## UseRouter

Permite el cambio de rutas mediante codigo desde el lado 'use Client'.

## Redirect

Usado en server components, mediante codigo y condicionales programamos que se rediriga a ciertas rutas.

- Redirect devuelve por defecto un código de estado 307 (Redirección temporal). Cuando se usa en una server action, devuelve un 303, que se usa comúnmente para redirigir a una página de éxito como resultado de una petición POST.
- Redirect genera internamente un error, _por lo que debe ejecutarse fuera de los bloques try/catch_.
- Redirect puede ser llamado en los Componentes Cliente durante el proceso de renderizado pero no en los manejadores de eventos. Puede utilizar el hook useRouter en su lugar.
- Redirect también acepta URLs absolutas y puede utilizarse para redirigir a enlaces externos.
- Si desea redirigir antes del proceso de renderizado, utilice next.config.js o Middleware.

## History API

Existe history.pushState y history.replaceState que son metodos para actualizar la pila del historial del navegador sin recargar la pagina.

## COMO FUNCIONA LA NAVEGACION Y EL ROUTING

En el server, el codigo de la aplicación pasa por el proceso de 'code-splitting' por el segmento de rutas.
En el lado del cliente, Next hace procesos de 'prefetching' y 'caching' a los segmentos de ruta lo que conlleva a que naveguemos a nuevas rutas, el navegador no recarge la pagina y solo ese segmento de ruta se vuelva a re renderizar mejorando la navegacion y perfomance.

## Code Splitting

Permite al codigo de la aplicación dividirse en pequeños bundles para que sean descargados y ejecutados por el navegador reduciendo la cantidad de data transferida y tiempo de ejecución por cada request. Los servers components permiten esta division de rutas automaticamente.

## Prefetching

Precarga una ruta en el background antes que el usuario la visite.
Existen 2 maneras:

- Con el componente Link:
  - Dependiente de la clase de ruta:
    - Ruta estática: por default el prefetch es true, la ruta es precargada y cacheada.
    - Ruta dinámica: por default es automatico, solo el layout compartido redenriza su arbol hasta el primer archivo loading.tsx reduciendo el costo de un fetching en una ruta dinámica entera.
- con el hook useRouter para precargar rutas mediante codigo.

## Caching

Next tiene del lado de cliente el Router Cache, que mientras uno navega por los segmentos de rutas y rutas visitadas su payload se ira cacheando, por lo que la cache es reusada lo mas posible.

## Partial Rendering

Solo los segmentos de rutas que van cambiando en la navegacion van re-renderizandose en el cliente y cualquier segmento compartido es preservado.

![rendering_partial](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fpartial-rendering.png&w=1080&q=75&dpl=dpl_AyAEyvHF4qPJiA73RQczzQQ6kDPN)

# CLASE7 01/03/2024 MANEJO DE PARAMETROS

Unicamente el archivo Page.tsx puede recibir el searchParams, el layout no puede dado que no se renderiza a diferencia del Page.
```
URL	              searchParams
/shop?a=1	      { a: '1' }
/shop?a=1&b=2         { a: '1', b: '2' }
/shop?a=1&a=2         { a: ['1', '2'] }
```

# CLASE8 02/03/2024 RENDERING - SERVER Y CLIENT COMPONENTS

Para entender plenamente este tema debemos estar familiarizados con estos tres conceptos:

## Enviroments
El codigo puede ser ejecutado tanto en el lado del server y cliente.
![renders](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fclient-and-server-environments.png&w=1920&q=75&dpl=dpl_3buUPLfjxh3hH2iw5eAdrMHkfwLc)

Por cliente se refiere: lo que el navegador solicita a traves del dispositivo del usuario y el server responde con una interface de usuario.
Por server: a la PC que almacena nuestro codigo de la aplicacion, la pc recibe una solicitud desde el cliente y este envía una respuesta.

## Request-Response Lifecycle
Inicia cuando un usuario visita o interactua con la aplicación.
En resumen el usuario interactura con la app, el cliente envía solicitudes http, llegan al server, este las procesa y reponde con recursos de HTML, CSS, JS, etc, esto se renderiza al cliente.

## Network Boundary
separa el codigo de server y del cliente.
Con las convenciones "use client" y "use server" podemos definir nuestras fronteras.
Si necesitas acceder al servidor desde el cliente, envías una nueva petición al servidor en lugar de reutilizar la misma petición. Esto facilita la comprensión de dónde renderizar sus componentes y dónde colocar el Límite de Red.


### SERVER COMPONENTS
Por defecto Next usa Server Components.
los react server components permiten escribir UI que puede ser renderizado y cacheado en el servidor.
Existen 3 estrategias de server rendering:

Los beneficios pueden ser:
	- Data Fetching:al tener tu codigo viviendo dentro del server y a lado de un posible data store, esto hace que se reduzcan los tiempos del fetch para realizar el renderizado.  
	- Seguridad: Mantiene los datos y la logica del server seguros, evitando exponerlos al cliente.
	- Cacheo: luego del renderizado, esta informacion se puede guardar y ser utilizada posteriormente.
	- Bundles Sizes: podemos tener dependencias "precargadas" lista, evitando que el cliente use mas data de los necesario.
	- Carga de la pagina inicial: El server genera html que permite al usuario visualizar la pagina inmediatamente.
	- SEO y SNS: ayuda a los bots generar visualizaciones de la pagina.
	- Streaming: facilita la visualizacion de pequeños bloques de la pagina, hasta que se carge toda.

#### Static Rendering

	- Las rutas son renderizadas en build time, los resultados pueden ser cacheados y empujados a un CDN.
	- Es util cuando una ruta tiene data que no es personalizada para el usuario, como un blog o pagina de producto.
#### Dynamic Rendering

	- Las rutas son renderizadas por cada usuario en cada request.
	- Es util cuando una ruta tiene data que si es personalizada hacia el usuario, como cookies o searchParams.
	- El uso de las funciones de cookies(), headers() y searchParams hacen que sea automaticamente un render dinámico en toda la ruta.
#### Streaming

	- Habilita que progresivamente veamos UI desde el servidor, diviendolo en pequeños trozos y enviandolo por diferentes canales o "stream/buffers"
	- El streaming está integrado por defecto en Next.js App Router. Esto ayuda a mejorar tanto el rendimiento inicial de carga de la página, así como la interfaz de usuario que depende de la obtención de datos más lentos que bloquearían la representación de toda la ruta. Por ejemplo, las reseñas en una página de producto.
 	- Para empezar a usar streaming route segments se puede utilizar Loading.tsx

### CLIENT COMPONENTS
Permite escribir UI interactivos que pueden ser renderizados en el lado del cliente al momento de la solicitud.
¿Cuando usarlos?
	- Cuando se usen hooks com useState, effects y event listeners.
	- Cuando se requiera usar Browser API.
Se puede usarlo colocando la directiva de  "use client" en el archivo deseado, lo que convertida a todos los archivos que se deriven en el como client components.

### COMPOSICION DE PATRONES

![patrones_render](https://static.platzi.com/media/user_upload/image-89819133-1240-45d3-b6e2-d5c13e5c5d6c.jpg)


# CLASE10 03/03/2024 CSS MODULES

Next soporta diferentes maneras de dar estilos a una aplicación:
- Global CSS: de Uso simple y familiar con el CSS tradicional, puede llevar problemas conforme la aplicación crezca y es llamado desde cualquier parte dentro del directorio app (import './global.css')
- CSS modules: Crea localmente un alcance de CSS evitando conflictos con los nombres de las clases del resto de componentes.
- Tailwind CSS: <3
- Sass: Preprocesador CSS, extiende el CSS.
- CSS-in-JS: CSS directo a la venas del componente.

## CSS modules

- Puede ser importado desde cualquier archivo dentro del app directory.
- Solo se habilitan con la extension module.css
- En produccion todos los CSS module son minificados y spliteados en archivos .css
- Las hojas de estilo publicadas por paquetes externos pueden importarse en cualquier parte del directorio de la aplicación.

## Sass
- Ya viene pre-integrado con Next, hay que instalar sus paquetes y usar sus extensiones .scss y .sass
- Se puede usar componentes Sass vía Css modules con la extension .module.sass
- Tenemos que configurar el archivo next.config.mjs
** AUN NO SE ENCUENTRA LA FUNCIONALIDAD .module.sass con turbopack, eviten turbopack para que no salgan errores**

```
import { dirname, join } from 'path';
/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: [join(dirname('./'), 'src/sass')],
    prependData: `@import "main.sass"`,
  },
};
export default nextConfig;
```

#CLASE13 03/03/20224

Assets estáticos
La carpeta /public de Next.js puede utilizarse para servir archivos estáticos como imágenes, fuentes y otros archivos. Los archivos dentro de /public también pueden ser almacenados en caché por los proveedores de CDN para que se entreguen de manera eficiente.

# Clase15Image

Image component es una version extendida y mejorada de la etiqueta <img> con caracteristicas de optimización:
- Optimización en tamaño.
- Estabilidad visual previniendo el layout shift
- Carga de paginas rapida mediante lazy loading con opciones de blur.
- Flexibilidad de Archivos: **ON-DEMAND** rescalamiento de imagenes, siempre para imagenes en server remotos.

Para imagenes locales se pueden importar .jpg,.png,.webp
Next automaticamente determina el width y height de la imagen basada en el archivo importado.

Para imagenes remotas es necesario indicar el width y height y opcionalmente el blurDataURL, estos tamaños no determinan el tamaño de renderizado de archivo de la imagen.
Para asegurar una optimizacion segura de imagenes es necesario configurar un patron en archivo next.config.js
El Loader predeterminado de las aplicaciones Next.js utiliza la API de optimización de imágenes incorporada, que optimiza las imágenes desde cualquier lugar de la web y, a continuación, las sirve directamente desde el servidor web Next.js. Si desea servir sus imágenes directamente desde un CDN o servidor de imágenes, puede escribir su propia función de carga con unas pocas líneas de JavaScript.

Dado que next/image se ha diseñado para garantizar unos buenos resultados de rendimiento, no puede utilizarse de forma que contribuya al desplazamiento del diseño, y debe dimensionarse de una de estas tres maneras:
Automáticamente, mediante una importación estática
Explícitamente, incluyendo una propiedad de anchura y altura
Implícitamente, usando fill, que hace que la imagen se expanda hasta llenar su elemento padre.

## Styling

El estilo del componente Image es similar al estilo de un elemento <img> normal, pero hay que tener en cuenta algunas directrices:

Utilice className o style, no styled-jsx.
En la mayoría de los casos, recomendamos utilizar la propiedad className. Puede ser un módulo CSS importado, una hoja de estilos global, etc.
También puede utilizar la propiedad style para asignar estilos en línea.
No puede usar styled-jsx porque está limitado al componente actual (a menos que marque el estilo como global).
Cuando se usa fill, el elemento padre debe tener position: relative
Cuando se utiliza fill, el elemento padre debe tener display: block
He aquí un resumen de los props disponibles para el componente de imagen:

![props_image](https://static.platzi.com/media/user_upload/Captura%20de%20pantalla%202024-03-03%20171904-45176d4a-578a-4132-8e9a-f5e1273a4d03.jpg)









