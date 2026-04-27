# CRM Agenda React

Proyecto realizado con React, TypeScript, Vite, PrimeReact y React Router para cubrir las competencias de la prueba de nivel React I.

## Stack

- React 19 + TypeScript
- Vite
- PrimeReact + PrimeIcons
- React Router DOM
- `json-server` para datos mock
- `localStorage` para preferencias de interfaz

## Funcionalidades

- Dashboard con resumen de empleados y agenda.
- CRUD de empleados mediante formulario no controlado y API mock.
- CRUD de tareas con asignacion a empleados.
- Navegacion por rutas estaticas con `Outlet`, `Link` y `NavLink`.
- Uso de `useState`, `useEffect`, eventos, renderizado condicional, listas y `keys`.
- Sincronizacion con `json-server` para empleados y tareas.
- Persistencia local para el tema claro/oscuro.

## Scripts

- `npm run dev`: entorno local de desarrollo.
- `npm run start`: levanta Vite y `json-server` al mismo tiempo.
- `npm run server`: API falsa con `json-server` en `http://localhost:3001`.
- `npm run build`: compilacion de produccion.
- `npm run lint`: revision de ESLint.

## Estructura

- `src/layout`: layout principal con navegacion.
- `src/pages`: vistas de dashboard, empleados y agenda.
- `src/components`: componentes reutilizables y dialogs de formulario.
- `src/hooks`: hook para persistencia del tema en `localStorage`.
- `src/data`: datos semilla de respaldo.
- `src/lib`: cliente sencillo para `json-server`.

## Notas para la defensa

- La app usa componentes funcionales y TypeScript en archivos `.tsx`.
- Los formularios son no controlados y se resuelven con `FormData`.
- Los datos funcionales salen de `json-server` y el tema visual se guarda en `localStorage`.
- Si se elimina un empleado, tambien se eliminan sus tareas asociadas para evitar registros huerfanos.
- El proyecto incluye `db.json` como backend mock para la demo tecnica.
