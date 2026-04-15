# Portfolio Windows 98

Portfolio personal interactivo inspirado en la estética de Windows 98, desarrollado con React, TypeScript y Vite.

La idea del proyecto es transformar un portfolio tradicional en una experiencia más visual y original, simulando un escritorio retro con iconos, ventanas movibles, barra de tareas y distintas secciones accesibles como si fueran aplicaciones del sistema.

## Características

- Interfaz inspirada en Windows 98
- Ventanas arrastrables
- Iconos de escritorio interactivos
- Barra de tareas con reloj en tiempo real
- Sección "Sobre mí"
- Sección de proyectos
- Formulario de contacto
- Descarga de CV en PDF
- Minijuego de Snake integrado
- Estilo retro con componentes personalizados

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- CSS
- react-draggable
- EmailJS
- Lucide React / React Icons

## Objetivo del proyecto

El objetivo de este proyecto es mostrar mi perfil como desarrollador de una forma más creativa e interactiva, combinando diseño retro con funcionalidades reales de un portfolio moderno.

## Estructura del proyecto

- `App.tsx`: controla el escritorio y la apertura de ventanas
- `components/Window.tsx`: componente base para las ventanas movibles
- `components/DesktopIcon.tsx`: iconos del escritorio
- `components/Taskbar.tsx`: barra de tareas con reloj e interacción
- `components/AboutApp.tsx`: presentación personal
- `components/ProyectsApp.tsx`: acceso a proyectos
- `components/EmailApp.tsx`: formulario de contacto
- `components/CV.tsx`: vista previa y descarga del CV
- `components/SnakeGame.tsx`: minijuego integrado

## Instalación

```bash
npm install
npm run dev
