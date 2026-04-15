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
  - **`App.tsx`**: Controla el escritorio y la interacción con las aplicaciones.
    - Gestiona las ventanas activas y permite abrir/cerrar aplicaciones.
    - Usa componentes como `DesktopIcon` y `Window`.
  - **`main.tsx`**: Punto de entrada del proyecto.
    - Renderiza el componente raíz `App` en el DOM.
  - **`components/`**: Componentes reutilizables y específicos.
    - `Window.tsx`: Componente base para ventanas movibles.
      - Implementa funcionalidad de arrastre con `react-draggable`.
      - Incluye barra de título y botón de cierre.
    - Otros componentes como `DesktopIcon`, `Taskbar`, y aplicaciones específicas (`AboutApp`, `ProyectsApp`, `EmailApp`, `SnakeGame`).
  - **`services/`**: Lógica de negocio y servicios externos.
    - `chat.tsx`: Servicio para manejar la comunicación con un servidor de chat.
      - Envía mensajes y maneja respuestas del servidor remoto.
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
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre el navegador en `http://localhost:5173`.

## Decisiones de Diseño

- **React y TypeScript**: Se eligieron para garantizar un desarrollo escalable y con tipado estático, reduciendo errores en tiempo de ejecución.
- **Vite**: Herramienta de construcción moderna que acelera el desarrollo gracias a su servidor rápido y soporte para TypeScript.
- **TailwindCSS**: Permite un diseño eficiente y reutilizable, con soporte para personalización avanzada.
- **Componentización**: Cada funcionalidad está encapsulada en componentes reutilizables, siguiendo principios de diseño modular.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por visitar mi portfolio! Espero que disfrutes explorando este proyecto tanto como yo disfruté creándolo.
