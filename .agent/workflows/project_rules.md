---
description: Reglas específicas para el proyecto de la landing page de Academia Navegatel
---

# Reglas del Proyecto: Academia Navegatel

Estas pautas de diseño deben aplicarse en todos los elementos de la web.

## 1. Paleta de Colores
Restricción estricta de colores. Solo usar los siguientes, salvo petición explícita contraria.
**Nota**: Estos colores están definidos en la configuración de Tailwind (dentro del HTML).

*   **Rojo Corporativo**: `#d8001d`.
*   **Azul Corporativo**: `#112635`.
*   **Blanco Puro**: `#ffffff`.

## 2. Tipografía
*   **Fuente Única**: `Montserrat`.
*   **Pesos**: Utilizar únicamente los pesos definidos en la configuración de Tailwind del proyecto.

## 3. Recursos y Assets (SVGs e Imágenes)
*   **SVG de Flecha**: NO aplicar rotación por CSS/clases (`rotate-45`, `transform`, etc.). El recurso original ya tiene la orientación correcta.

## 4. Autoridad de Diseño
*   **Prioridad**: La imagen de referencia de diseño aportada es la autoridad máxima.
*   **Conflictos**: Si encuentras cambios manuales míos (Usuario) que parecen intentos de corregir o ajustar algo que tú hiciste, pero que se desvían del diseño original, ignora mis intentos "torpes" y **básate SIEMPRE en la referencia de diseño visual** para implementar la solución correcta.

## 5. Consistencia Tipográfica y de Estructura
*   **Títulos de Sección (h2)**: Deben mantener una consistencia visual absoluta entre todas las secciones (mismo tamaño, peso, estilo, espaciado).
    *   **Excepción**: La sección "Cómo funciona" tiene su propio estilo alineado.
    *   **Regla General**: Todos los demás H2 deben alinearse exactamente igual que en la sección "Solución": contenedor `w-[65%]` centrado, con el contenido (texto y elementos) alineado a la izquierda.
*   **Títulos de Tarjetas (h3)**: Todos los títulos dentro de cards o contenedores similares deben ser consistentes entre sí en toda la web.