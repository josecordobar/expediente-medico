**PROMPT PARA TRAE.AI: MVP DE GESTIÓN DE EXPEDIENTES MÉDICOS**

**Objetivo del Proyecto:** Desarrollar un Producto Mínimo Viable (MVP) para la gestión digital de expedientes médicos.

**Requisitos Mandatorios:**
1.  **Framework/IDE:** Utiliza el framework "Trae" (Modo SOLO Builder) para la creación.
2.  **Persistencia:** Implementar persistencia real utilizando **Supabase** (PostgreSQL), incluyendo tablas y autenticación.
3.  **Despliegue:** Configurar el proyecto para un despliegue final y continuo en **Vercel**.

**Pila Tecnológica Deseada:**
* **Frontend:** React con TypeScript.
* **Estilo:** Tailwind CSS para un diseño **moderno, limpio y profesional** con una paleta de colores minimalista (azul claro, blanco y gris, estilo aplicación clínica moderna).
* **Diseño:** Interfaz optimizada para escritorio, con un **Dashboard** lateral izquierdo de navegación. (Prioridad Estética 4/5).

**Funcionalidades Principales (Mínimo 3 Requeridas):**

1.  **FUNCIÓN 1: Registro de Nuevo Paciente/Expediente (Create)**
    * Crear una vista/formulario para registrar nuevos pacientes.
    * Campos obligatorios: `Nombre Completo`, `Fecha de Nacimiento`, `Número de Teléfono`, `Cédula/ID`.
    * La persistencia de los datos debe ser inmediata en la tabla `patients` de Supabase.

2.  **FUNCIÓN 2: Búsqueda y Visualización de Expediente (Read/List)**
    * Crear una vista principal con una **tabla o lista interactiva** que muestre a todos los pacientes.
    * Implementar una **barra de búsqueda rápida** (por Nombre o Cédula).
    * Al seleccionar un paciente, navegar a una vista detallada (`/paciente/[id]`) que muestre su información biográfica y su **Historial de Consultas**.

3.  **FUNCIÓN 3: Adición de Nota de Consulta (Update)**
    * En la vista detallada del paciente, implementar un formulario simple para **añadir una nueva "Nota de Consulta"** a su historial.
    * Campos para la nota: `Fecha` (automática), `Título de la Consulta` y `Detalle de la Consulta` (área de texto grande).
    * Esta nota debe persistirse en una tabla relacionada (`consultations`) en Supabase y actualizar la vista del historial.

**Instrucciones Adicionales para el Agente:**
* Implementar una **Autenticación Simple** (por ejemplo, inicio de sesión con correo/contraseña usando Supabase Auth) y restringir el acceso a todas las vistas excepto el *login*.
* Configurar las variables de entorno para la conexión a Supabase de forma segura, preparadas para Vercel.