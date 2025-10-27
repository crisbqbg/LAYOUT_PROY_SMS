# 🚀 Sistema de Reclutamiento SMS - Liderman

## 📋 Descripción del Proyecto

Sistema moderno de reclutamiento y selección para Liderman, con interfaz web responsiva diseñada con Tailwind CSS. El sistema permite a los postulantes registrarse, interactuar con un chatbot IA, y seleccionar su reclutador preferido.

## 🎯 Flujo del Postulante (Fase 2)

### 1️⃣ Landing Page (`landing.html`)
**El postulante accede al sistema y visualiza:**
- Logo institucional de Liderman
- Mensaje de bienvenida atractivo
- Beneficios del puesto (sueldo, horarios, crecimiento)
- **Opciones de acceso:**
  - 🔐 Continuar con Google (OAuth simulado)
  - 📝 Ingresar Manualmente
  - 💬 Contactar por WhatsApp

**Características:**
- Diseño glassmorphism moderno
- Animaciones suaves
- Totalmente responsive
- Barra de progreso del proceso

---

### 2️⃣ Formulario de Registro (`formulario.html`)
**Campos del formulario:**
- Nombres y Apellidos
- DNI (validación 8 dígitos)
- Teléfono (validación 9 dígitos)
- Edad (18-65 años)
- Estatura (metros)
- Ciudad y Distrito
- Correo electrónico
- Cargo de interés

**Validaciones:**
- Validación en tiempo real
- Campos obligatorios
- Formatos específicos (DNI, teléfono, email)
- Mensajes de error claros

**Funcionalidades:**
- Prellenado si viene de Google
- Guardado en sessionStorage
- Progreso 33% (Paso 1 de 3)

---

### 3️⃣ Chatbot Inteligente (`chatbot.html`)
**Conversación automatizada:**
- Saludo personalizado con nombre del postulante
- Presentación del puesto disponible
- Detalles completos:
  - 💰 Sueldo: S/1,800 - S/2,200
  - ⏰ Horario: 12x12
  - 🚌 Beneficios: Movilidad, uniformes, seguro
  - 📈 Oportunidades de crecimiento

**Respuestas rápidas interactivas:**
- Horarios
- Beneficios
- Requisitos
- Ubicación

**Características:**
- Animación de escritura (typing indicator)
- Burbujas de chat diferenciadas (bot/usuario)
- Respuestas contextuales basadas en datos del formulario
- Progreso 66% (Paso 2 de 3)

---

### 4️⃣ Selección de Reclutador (`seleccion-reclutador.html`)
**Grid de reclutadores disponibles:**

Cada reclutador muestra:
- Foto de perfil
- Nombre y cargo
- Estado (Disponible/Ocupado/No disponible)
- Años de experiencia
- Número de contrataciones
- Valoración (estrellas)

**6 Reclutadores con diferentes estados:**
1. María González - Senior (Disponible) ⭐ 4.9
2. Carlos Ramírez - Reclutador (Disponible) ⭐ 4.8
3. Ana Flores - Reclutadora (Ocupada) ⭐ 4.7
4. Luis Torres - Senior (Disponible) ⭐ 5.0
5. Patricia Mendoza - Reclutadora (No disponible) ⭐ 4.6
6. Jorge Vargas - Reclutador (Disponible) ⭐ 4.8

**Funcionalidades:**
- Cards interactivas con hover effect
- Selección visual con borde resaltado
- Indicadores de estado en tiempo real
- Confirmación antes de continuar
- Progreso 100% (Paso 3 de 3)

---

### 5️⃣ Confirmación Final (`confirmacion-final.html`)
**Pantalla de éxito con:**
- ✅ Animación de checkmark
- Confetti celebratorio
- Resumen del registro completo
- Timeline del proceso de contratación

**6 Etapas del proceso:**
1. ✅ Verificación de Datos (Completado)
2. 🔄 Análisis de Matriz (En proceso - 1-2 días)
3. ⏳ Examen Médico Ocupacional (Pendiente - 3-5 días)
4. ⏳ Homologación y Capacitación (Pendiente - 2 días)
5. ⏳ DIC-20 y Documentación (Pendiente)
6. ⏳ Contratación e Inicio (Pendiente)

**Información de contacto:**
- Reclutador asignado
- WhatsApp de contacto
- Email del postulante
- Tiempo estimado: 7-10 días hábiles

**Acciones disponibles:**
- 📥 Descargar comprobante de registro (TXT)
- 💬 Contactar por WhatsApp
- 🏠 Volver al inicio

---

## 🗄️ Registro en Base de Datos

Al completar el proceso, se genera un registro con:

```javascript
{
  // Datos personales
  nombres: string,
  apellidos: string,
  dni: string,
  telefono: string,
  edad: number,
  estatura: number,
  ciudad: string,
  distrito: string,
  email: string,
  cargo: string,
  
  // Datos del proceso
  reclutadorId: number,
  reclutadorNombre: string,
  fechaRegistro: ISO Date,
  fechaContacto: ISO Date,
  estado: "Nuevo interesado",
  proceso: "Verificación"
}
```

---

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS moderno
- **JavaScript Vanilla**: Lógica de interacción
- **SessionStorage**: Persistencia temporal de datos
- **LocalStorage**: Simulación de base de datos

---

## 🌟 Características Destacadas

### Design System
- ✨ Glassmorphism design
- 🎨 Gradientes modernos
- 🌙 Dark theme profesional
- 📱 100% Responsive (Mobile-first)
- ⚡ Animaciones fluidas

### UX/UI
- 🔄 Feedback visual constante
- ⏱️ Indicadores de progreso
- 🎯 Navegación intuitiva
- 🚀 Carga rápida
- ♿ Accesible

### Funcionalidades
- ✅ Validación en tiempo real
- 💾 Guardado automático de datos
- 🔐 Simulación de OAuth Google
- 💬 Chat interactivo con IA
- 📊 Timeline de proceso
- 📥 Descarga de comprobantes

---

## 📂 Estructura de Archivos

```
liderman-ui/
│
├── landing.html                    # Landing principal con opciones de acceso
├── formulario.html                 # Registro de datos personales
├── chatbot.html                    # Asistente virtual con IA
├── seleccion-reclutador.html       # Grid de reclutadores disponibles
├── confirmacion-final.html         # Confirmación y timeline del proceso
│
├── index.html                      # Portal de login administrativo
├── postulante.html                 # Vista antigua (legacy)
├── reclutador.html                 # Vista reclutador
│
├── /css/
│   ├── styles.css                  # Estilos legacy
│   └── custom.css                  # Personalizaciones
│
├── /js/
│   └── main.js                     # Lógica JavaScript
│
└── /img/
    ├── logo.png                    # Logo Liderman
    └── avatar1.jpg                 # Avatares de reclutadores
```

---

## 🚀 Cómo Usar

### Para Postulantes:
1. Abrir `landing.html`
2. Elegir método de acceso (Google o Manual)
3. Completar formulario de registro
4. Interactuar con el chatbot
5. Seleccionar reclutador preferido
6. Recibir confirmación y comprobante

### Para Reclutadores:
1. Abrir `index.html`
2. Login con credenciales (r123/r123)
3. Ver tabla de postulantes
4. Gestionar candidatos

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔮 Próximas Mejoras

- [ ] Integración real con Google OAuth
- [ ] Backend con API REST
- [ ] Base de datos real (MySQL/PostgreSQL)
- [ ] Sistema de notificaciones SMS
- [ ] Panel de administración completo
- [ ] Dashboard con analíticas
- [ ] Sistema de videollamadas
- [ ] Chat en vivo con reclutadores
- [ ] App móvil nativa (React Native)

---

## 👥 Equipo de Desarrollo

**Prototipo desarrollado para:** Liderman - Reclutamiento & Selección

**Fecha:** Octubre 2025

---

## 📄 Licencia

© 2025 Liderman. Todos los derechos reservados.

---

## 🆘 Soporte

Para soporte técnico:
- 📧 Email: rrhh@liderman.com.pe
- 📱 WhatsApp: +51 930 973 745

---

**"Valemos tanto como lo que cuidamos"** 🛡️
