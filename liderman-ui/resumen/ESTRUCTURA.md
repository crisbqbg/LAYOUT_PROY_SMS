# 📁 Estructura Final del Proyecto - Liderman SMS

## 🎯 Flujo Principal de Postulación (5 pasos)

### 1️⃣ **landing.html** - Landing Page Portal de Empleos
- **Descripción**: Página inicial con diseño moderno de portal de empleos
- **Características**:
  - Formulario con selectores geográficos en cascada (País → Ciudad → Distrito)
  - Estadísticas de la empresa (25K+ colaboradores, 50+ años)
  - Beneficios detallados (6 cards animadas)
  - Integración Google OAuth (simulado)
  - Botón WhatsApp directo
  - Validación completa de datos
- **Redirige a**: `formulario.html`
- **Ubicación geográfica**: Perú, Chile, Ecuador, USA con ciudades y distritos

### 2️⃣ **formulario.html** - Registro de Datos Personales
- **Descripción**: Formulario completo con 9 campos requeridos
- **Campos**:
  - Nombres y Apellidos
  - DNI (8 dígitos, validación real-time)
  - Teléfono (9 dígitos, validación)
  - Edad (18-65 años)
  - Estatura (1.40 - 2.10 m)
  - Ciudad y Distrito
  - Email
  - Cargo de interés
- **Validaciones**: DNI, teléfono, edad, estatura
- **Guarda en**: sessionStorage como 'postulanteData'
- **Redirige a**: `chatbot.html`

### 3️⃣ **chatbot.html** - Asistente Virtual Interactivo
- **Descripción**: Chatbot con IA que explica detalles del puesto
- **Características**:
  - Typing indicator animado
  - Respuestas rápidas (Horarios, Beneficios, Requisitos, Ubicación)
  - Conversación fluida y contextual
  - Lee datos del postulante desde sessionStorage
  - Personaliza mensajes con el nombre
- **Redirige a**: `seleccion-reclutador.html`

### 4️⃣ **seleccion-reclutador.html** - Elección de Reclutador
- **Descripción**: Grid con 6 reclutadores disponibles
- **Características**:
  - Cards interactivas con hover effects
  - Estados: Disponible (verde), Ocupado (amarillo), No disponible (rojo)
  - Información: Nombre, experiencia, rating (estrellas)
  - Solo permite seleccionar reclutadores disponibles
  - Confirmación de selección
- **Guarda en**: localStorage como registro completo
- **Redirige a**: `confirmacion-final.html`

### 5️⃣ **confirmacion-final.html** - Confirmación y Éxito
- **Descripción**: Página de éxito con timeline y descarga
- **Características**:
  - Animación de checkmark
  - Confetti celebratorio
  - Timeline de 6 etapas del proceso
  - Resumen completo de datos
  - Descarga de comprobante (.txt)
  - Botón WhatsApp para contacto
  - Código de registro único
- **Redirige a**: `landing.html` (Nueva postulación)

---

## 👔 Flujo del Reclutador (2 pasos)

### 🔐 **index.html** - Portal de Login
- **Descripción**: Página de autenticación para usuarios y reclutadores
- **Credenciales**:
  - Usuario: `u123` / Contraseña: `u123`
  - Reclutador: `r123` / Contraseña: `r123`
- **Características**:
  - Diseño moderno con glassmorphism
  - Validación de credenciales
  - Toggle para mostrar/ocultar contraseña
- **Redirige a**: `reclutador.html` (si rol = reclutador)

### 📊 **reclutador.html** - Dashboard de Gestión
- **Descripción**: Panel administrativo para gestionar postulantes
- **Características**:
  - Tabla de postulantes con datos completos
  - Filtros y búsqueda
  - Estados: Pendiente, Aprobado, Rechazado
  - Botones de acción: Ver detalle, Aprobar, Rechazar
  - Contador de registros
  - Datos desde localStorage
- **Funcionalidades**: Aprobar/Rechazar candidatos

---

## 🗺️ **guia-navegacion.html** - Guía Visual Interactiva
- **Descripción**: Mapa completo del sistema con navegación guiada
- **Características**:
  - Selector de rol (Postulante vs Reclutador)
  - Descripción detallada de cada paso
  - Tips y consejos por página
  - Datos de prueba preconfigurados (botón copiar)
  - Links directos a cada vista
  - Sección de herramientas
  - Documentación integrada
- **Uso**: Punto de entrada para entender el flujo completo

---

## 📂 Archivos de Soporte

### 📄 Documentación
- **README.md**: Documentación completa del proyecto (200+ líneas)
- **RESUMEN.md**: Resumen ejecutivo con características clave

### 📁 Carpetas
- **css/**: Estilos personalizados
  - `custom.css`: Estilos adicionales si es necesario
  
- **js/**: JavaScript compartido
  - `main.js`: Funciones comunes (login, validaciones, storage helpers)
  
- **img/**: Recursos visuales
  - `logo.png`: Logo de Liderman
  - `avatar1-6.jpg`: Fotos de reclutadores (placeholders)

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO DEL POSTULANTE                      │
└─────────────────────────────────────────────────────────────┘

1. landing.html
   ├─ Completa datos básicos + ubicación
   └─ Guarda → sessionStorage['landingData']
          ↓
2. formulario.html
   ├─ Completa datos detallados (9 campos)
   └─ Guarda → sessionStorage['postulanteData']
          ↓
3. chatbot.html
   ├─ Lee sessionStorage['postulanteData']
   ├─ Interactúa con chatbot
   └─ Confirma interés
          ↓
4. seleccion-reclutador.html
   ├─ Lee sessionStorage['postulanteData']
   ├─ Selecciona reclutador
   └─ Guarda → localStorage['registros'] (array)
          ↓
5. confirmacion-final.html
   ├─ Lee sessionStorage['registroCompleto']
   ├─ Muestra timeline y resumen
   └─ Descarga comprobante.txt
```

---

## 🎨 Características de Diseño

### Tecnologías
- **Framework CSS**: Tailwind CSS 3.x (CDN)
- **JavaScript**: Vanilla ES6+
- **Storage**: sessionStorage + localStorage
- **Fuente**: Inter (Google Fonts)

### Patrones de Diseño
- **Glassmorphism**: backdrop-filter, blur effects
- **Gradientes animados**: background-size con animation
- **Cards interactivas**: hover effects, transform, box-shadow
- **Validación en tiempo real**: regex patterns
- **Responsive design**: Mobile-first approach

### Paleta de Colores
- **Primario**: Blue (#3b82f6, #2563eb)
- **Secundario**: Purple (#8b5cf6, #a78bfa)
- **Éxito**: Green (#10b981, #059669)
- **Fondo**: Dark (#0a0f1e, #1a1f3a)
- **Texto**: White (#fff, #f9fafb)

---

## 📊 Estadísticas del Proyecto

- **Archivos HTML**: 7 (flujo) + 1 (guía) = 8 archivos
- **Líneas de código**: ~3,500+ líneas
- **Países soportados**: 4 (Perú, Chile, Ecuador, USA)
- **Ciudades**: 16 ciudades principales
- **Distritos/Zonas**: 100+ ubicaciones
- **Reclutadores**: 6 perfiles
- **Campos de formulario**: 9 campos validados
- **Mensajes de chatbot**: 15+ interacciones

---

## 🚀 Cómo Usar el Sistema

### Para Probar el Flujo Completo:
1. Abre `guia-navegacion.html`
2. Click en "👤 Soy Postulante"
3. Sigue los 5 pasos en orden
4. Usa los datos de prueba proporcionados

### Para el Panel de Reclutador:
1. Abre `index.html`
2. Credenciales: `r123` / `r123`
3. Accede al dashboard de gestión

### Datos de Prueba:
```
Nombres: Juan Carlos
Apellidos: Pérez Mendoza
DNI: 61147505
Teléfono: 930973745
Edad: 25
Estatura: 1.75
País: Perú
Ciudad: Lima
Distrito: San Juan de Miraflores
Email: juan.perez@gmail.com
Cargo: Agente de Seguridad
```

---

## ✅ Archivos Eliminados (No esenciales)

Los siguientes archivos fueron removidos por no formar parte del flujo principal:
- ❌ `postulante.html` - No usado en secuencia
- ❌ `test.html` - Archivo de pruebas temporales
- ❌ `test-ubicacion.html` - Prueba específica de selectores
- ❌ `demo.html` - No existía en el proyecto
- ❌ `GUIA_RAPIDA.md` - Contenido redundante

---

## 🎯 Próximos Pasos (Producción)

1. **Integración Backend**:
   - API REST para guardar registros
   - Base de datos (MySQL/PostgreSQL)
   - Autenticación JWT

2. **OAuth Real**:
   - Google OAuth 2.0
   - Facebook Login

3. **WhatsApp Business API**:
   - Integración oficial
   - Mensajes automáticos

4. **Recursos**:
   - Logo real de Liderman
   - Fotos reales de reclutadores
   - Actualizar número de WhatsApp

5. **Optimizaciones**:
   - Minificar CSS/JS
   - Lazy loading de imágenes
   - Service Worker para offline

---

## 📞 Contacto

**Proyecto**: Sistema de Reclutamiento SMS - Liderman
**Versión**: 1.0.0
**Fecha**: Octubre 2025
**Tipo**: Prototipo funcional

---

*Este documento fue generado automáticamente y refleja la estructura actual del proyecto.*
