# CRM Agenda React

Proyecto desarrollado con React, TypeScript, Vite, PrimeReact, React Router y `json-server` para cubrir la **Prueba de nivel React I**.

## Objetivo

Construir una agenda basica tipo CRM que permita gestionar empleados y tareas, demostrando las competencias tecnicas pedidas en el examen:

- creacion y configuracion del proyecto
- JSX y React DOM
- estructura por componentes
- composicion con props y `children`
- listas con `key` y renderizado condicional
- eventos y ciclo de vida
- `useState` y `useEffect`
- formularios no controlados con operaciones CRUD
- rutas, layout y navegacion con React Router

## Stack

- React 19
- TypeScript
- Vite
- PrimeReact + PrimeIcons
- React Router DOM
- `json-server`
- `localStorage` para preferencias de interfaz

## Funcionalidades principales

- Dashboard con resumen de empleados, carga de trabajo y proximas tareas.
- CRUD de empleados.
- CRUD de tareas con asignacion a empleados.
- Borrado en cascada: si se elimina un empleado, tambien se eliminan sus tareas asociadas.
- Formularios no controlados con `FormData`.
- Busqueda y filtrado en agenda.
- Cambio de tema claro/oscuro persistido en `localStorage`.
- Datos servidos desde `json-server` mediante `db.json`.
- Navegacion por rutas estaticas con `Outlet`, `Link` y `NavLink`.

## Scripts

- `npm run dev`: levanta solo Vite.
- `npm run server`: levanta solo `json-server` en `http://localhost:3001`.
- `npm run start`: levanta Vite y `json-server` al mismo tiempo.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: genera la build de produccion.
- `npm run check`: ejecuta lint + build.

## Instalacion y ejecucion

```bash
npm install
npm run start
```

Aplicacion:

- `http://127.0.0.1:4173`

API mock:

- `http://localhost:3001/employees`
- `http://localhost:3001/tasks`

## Estructura del proyecto

- `src/layout`: layout principal y cabecera de la aplicacion.
- `src/pages`: vistas de dashboard, empleados y agenda.
- `src/components`: dialogs y componentes reutilizables.
- `src/lib`: cliente HTTP sencillo para `json-server`.
- `src/hooks`: persistencia local del tema.
- `src/data`: datos semilla de respaldo.
- `db.json`: base de datos mock para `json-server`.
- `docs/branching-strategy.md`: estrategia de ramas del ejercicio.

## Cobertura del examen

### Competencia 1: creacion del proyecto

- Proyecto creado con Vite.
- Configuracion revisada en `package.json` y `tsconfig.app.json`.
- Dependencias gestionadas con npm.

### Competencia 2: JSX, React DOM

- Render principal en [src/main.tsx](C:/Users/User/Desktop/crm-react/src/main.tsx).
- Aplicacion principal en [src/App.tsx](C:/Users/User/Desktop/crm-react/src/App.tsx).

### Competencia 3: Elements, Components, Classes, this, binding

- Se opta por componentes funcionales, como permite el enunciado.
- Separacion clara entre layout, paginas, dialogs y componentes reutilizables.

### Competencia 4: composing & extracting, props, children

- Uso de props para compartir estado y comportamiento.
- Uso de `children` en [src/components/SectionCard.tsx](C:/Users/User/Desktop/crm-react/src/components/SectionCard.tsx).

### Competencia 5: lists & keys, conditional rendering

- Listas renderizadas con `key` en agenda, dashboard y empleados.
- Renderizado condicional en mensajes vacios, estados de carga y paneles de informacion.

### Competencia 6: Lifecycle, Events

- Eventos de botones, formularios, filtros, borrado y toggles.
- Manejo de efectos de ciclo de vida con `useEffect`.

### Competencia 7: useState, useEffect

- `useState` para estado UI y datos.
- `useEffect` para carga inicial de API, reloj del dashboard y sincronizacion de tema.

### Competencia 8: Uncontrolled forms

- Formularios no controlados con `FormData`.
- CRUD completo de empleados y tareas.
- Persistencia mediante `json-server`.

### Competencia 9: Routing, layout + navegacion

- React Router con `Routes`, `Route`, `Outlet`, `Link` y `NavLink`.
- Layout compartido con navegacion lateral.

## Ramas del ejercicio

El repositorio incluye ramas snapshot por competencia:

- `nivel-1-creacion`
- `nivel-2-jsx-react-dom`
- `nivel-3-components-structure`
- `nivel-4-props-children`
- `nivel-5-lists-conditional-rendering`
- `nivel-6-lifecycle-events`
- `nivel-7-usestate-useeffect`
- `nivel-8-uncontrolled-forms-crud`
- `nivel-9-routing-layout-navegacion`

`master` queda como rama principal con el estado final integrado.

## Decisiones tecnicas para la defensa

- Se eligio PrimeReact para acelerar la UI sin sacrificar estructura.
- Se uso `json-server` para simular una API real y evitar una demo puramente local.
- El tema visual se guarda en `localStorage` porque es una preferencia de usuario, no un dato de negocio.
- Los formularios se mantuvieron no controlados para cumplir el enunciado de forma explicita.
- El borrado en cascada evita tareas huerfanas y mejora la coherencia del mock backend.

## Estado final

- `lint` correcto
- `build` correcta
- `json-server` integrado
- proyecto listo para defensa tecnica
