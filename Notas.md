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

Dentro del App router pueden existir estos archivos:
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
  [x] Dynamic Routes
  [x] Route Groups and Private Folders
  [x] Parallel and Intercepted Routes
  [x] Metadata File Conventions
  [x] Open Graph and Twitter Images
  [x] SEO
  [text](https://nextjs.org/docs/getting-started/project-structure)

** CLASE4 Resumen 25/02/2024**
