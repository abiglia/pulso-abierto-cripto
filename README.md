# Pulso Abierto - Mercado Cripto

Aplicación web desarrollada con **React, TypeScript y Vite** para consultar en tiempo real las cotizaciones de Bitcoin, Ethereum y Solana, filtrar activos mediante un formulario controlado, consultar vistas de detalle por ruta y gestionar una lista persistente de favoritos.

* **Alumno:** Aaron Biglia  
* **Repositorio de GitHub:** https://github.com/abiglia/pulso-abierto-cripto  
* **Aplicación publicada en Vercel:** https://pulso-abierto-cripto.vercel.app  

---

## Tecnologías principales

* **React 19** y **TypeScript**
* **Vite** (entorno de desarrollo y empaquetado productivo)
* **React Router DOM** (navegación SPA entre listado y vistas de detalle)
* **Zustand** con middleware `persist` (estado global de favoritos sincronizado con `localStorage`)
* **Zod** (validación de entradas del formulario)
* **Vitest**, **Testing Library** y **jsdom** (pruebas automatizadas unitarias y de interfaz)
* **ESLint** (análisis estático de código)

---

## Variables de entorno

El proyecto **no requiere variables de entorno** (`.env`), ya que consume directamente el endpoint público de CoinGecko (`/api/v3/simple/price`) sin clave de API privada.

---

## Instalación y comandos disponibles

1. **Instalar dependencias:**
   ```bash
   npm install