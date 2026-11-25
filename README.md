# Pulso Abierto - Mercado Cripto (Actividad 3)

Aplicación web desarrollada con **React, TypeScript y Vite** para consultar cotizaciones de criptomonedas en tiempo real, visualizar el detalle de cada activo y gestionar una lista persistente de favoritos.

**Alumno:** Aaron Biglia  
**Materia:** Programación Web - Módulo 3  

---

## Funcionalidades principales

- **Consulta de cotizaciones en tiempo real:** Consumo centralizado de la API pública de CoinGecko (`/api/v3/simple/price`) mediante `cryptoService.ts`, con transformación de datos tipada, manejo de errores HTTP y deduplicación de consultas concurrentes.
- **Filtrado y navegación:** Búsqueda por nombre/símbolo, filtro por categoría y vista de detalle individual (`/criptomonedas/:id`) con React Router.
- **Estado global y persistencia:** Gestión de favoritos mediante **Zustand** (`useFavoritesStore`) con persistencia selectiva en `localStorage`, sincronizando tarjetas, vista de detalle y contador global en el encabezado.
- **Pruebas automatizadas:** Suite de tests unitarios y de integración con **Vitest** y **Testing Library**.

---

## Instalación y ejecución

1. Instalar las dependencias del proyecto:
   ```bash
   npm install