# Branching strategy

Este proyecto se inicializo como repositorio Git despues del desarrollo funcional principal.

Para alinear la entrega con el enunciado, se define una estrategia retrospectiva y honesta:

1. `master` contiene el estado final integrado del proyecto.
2. Cada rama `nivel-*` representa una competencia del examen.
3. Cada rama recibe un commit snapshot descriptivo.
4. Cada rama se mergea en `master` con merge commit explicito para que la historia del repositorio refleje la secuencia de competencias.

## Ramas creadas

- `nivel-1-creacion`
- `nivel-2-jsx-react-dom`
- `nivel-3-components-structure`
- `nivel-4-props-children`
- `nivel-5-lists-conditional-rendering`
- `nivel-6-lifecycle-events`
- `nivel-7-usestate-useeffect`
- `nivel-8-uncontrolled-forms-crud`
- `nivel-9-routing-layout-navegacion`

## Importante

La historia Git no reproduce un desarrollo dia a dia real desde el inicio del proyecto, porque el repositorio no existia todavia en ese momento. Lo que si ofrece es una trazabilidad clara, ordenada y defendible por competencia, que es el objetivo principal pedido por el examen.
