# Portfolio Windows 98

Un portfolio interactivo inspirado en la estética de Windows 98, diseñado para destacar habilidades técnicas y creatividad como desarrollador. Este proyecto combina diseño retro con funcionalidades modernas, ofreciendo una experiencia única y visualmente atractiva.

## Descripción del Proyecto

El objetivo principal de este proyecto es transformar un portfolio tradicional en una experiencia interactiva, simulando un escritorio retro con iconos, ventanas movibles, barra de tareas y aplicaciones funcionales. Este enfoque no solo muestra habilidades técnicas, sino también creatividad en el diseño y la implementación.

### Funcionalidades Clave

- **Interfaz Retro Inspirada en Windows 98**: Diseño visual que evoca nostalgia y originalidad.
- **Ventanas Movibles**: Implementación de ventanas arrastrables con `react-draggable`.
- **Iconos Interactivos**: Iconos de escritorio que abren aplicaciones simuladas.
- **Barra de Tareas Dinámica**: Incluye un reloj en tiempo real y control de ventanas.
- **Aplicaciones Integradas**:
  - **Sobre mí**: Presentación personal.
  - **Proyectos**: Galería de proyectos destacados.
  - **Formulario de Contacto**: Envío de mensajes con EmailJS.
  - **Descarga de CV**: Descarga del currículum en formato PDF.
  - **Minijuego Snake**: Juego clásico integrado.
- **Estilo Personalizado**: Uso de TailwindCSS con colores y estilos extendidos.

## Tecnologías Utilizadas

El proyecto está construido con un stack moderno y herramientas de desarrollo eficientes:

- **Frontend**:
  - React y TypeScript para una arquitectura robusta y tipada.
  - TailwindCSS para un diseño modular y eficiente.
  - Vite como herramienta de construcción rápida y moderna.
- **Librerías**:
  - `react-draggable` para ventanas movibles.
  - `EmailJS` para la integración del formulario de contacto.
  - `lucide-react` y `react-icons` para iconos personalizados.
- **Herramientas de Desarrollo**:
  - ESLint y TypeScript para garantizar calidad y consistencia en el código.
  - PostCSS para procesamiento de estilos.

## Estructura del Proyecto

El proyecto está organizado de manera modular para facilitar la escalabilidad y el mantenimiento:

- **`src/`**: Carpeta principal del código fuente.
  - **`components/`**: Componentes reutilizables y específicos.
    - `Window.tsx`: Componente base para ventanas movibles.
    - `DesktopIcon.tsx`: Iconos interactivos del escritorio.
    - `Taskbar.tsx`: Barra de tareas con reloj e interacción.
    - Aplicaciones específicas como `AboutApp.tsx`, `ProyectsApp.tsx`, `EmailApp.tsx`, `SnakeGame.tsx`.
  - **`services/`**: Lógica de negocio y servicios externos (e.g., integración con EmailJS).
  - **`assets/`**: Recursos estáticos como imágenes y fuentes.
- **`public/`**: Archivos estáticos accesibles directamente.
- **`tailwind.config.js`**: Configuración personalizada de TailwindCSS.
- **`vite.config.ts`**: Configuración de Vite para el entorno de desarrollo.

## Instalación y Uso

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd mi-portfolio
