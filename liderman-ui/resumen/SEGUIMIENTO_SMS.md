# 📊 Sistema de Seguimiento SMS - Documentación Completa

## 🎯 Descripción General

Sistema completo de seguimiento de mensajes SMS masivos integrado con el módulo de envíos. Permite monitorear en tiempo real el estado de cada mensaje enviado a los postulantes.

---

## 🗂️ Estructura del Sistema

### **Archivos Principales:**

1. **`SMS/envio-masivo.html`** - Módulo de envío masivo
2. **`reclutador/seguimiento-sms.html`** - Vista de seguimiento y monitoreo ✨ NUEVO
3. **`reclutador/dashboard.html`** - Dashboard actualizado con acceso a seguimiento

---

## 📤 Flujo de Datos: Inserción

### **Paso 1: Envío desde Módulo SMS**

El reclutador realiza los siguientes pasos:

```
1. Accede a: SMS/envio-masivo.html
2. Carga archivo Excel con contactos
3. Escribe mensaje personalizado con variables
4. Hace clic en "Enviar Campaña"
```

### **Código de Inserción:**

Cuando se hace clic en "Enviar Campaña", el sistema ejecuta:

```javascript
function enviarMensajes() {
  // Crear registros con todos los datos necesarios
  const registrosSMS = contactos.map((contacto, index) => ({
    id: Date.now() + index,              // ID único
    fecha: new Date().toISOString(),     // Timestamp
    nombre: contacto.nombre,              // Nombre del postulante
    telefono: contacto.telefono,          // Número de teléfono
    dni: contacto.dni || 'N/A',          // DNI (opcional)
    mensaje: personalizarMensaje(...),    // Mensaje personalizado
    enviado: true,                        // Estado: enviado
    recibido: false,                      // Estado: recibido
    respondido: false,                    // Estado: respondido
    registrado: false,                    // Estado: registrado
    estado: 'enviado'                     // Estado general
  }));
  
  // Guardar en localStorage
  const registrosExistentes = JSON.parse(
    localStorage.getItem('smsCampanas') || '[]'
  );
  const todosRegistros = [...registrosExistentes, ...registrosSMS];
  localStorage.setItem('smsCampanas', JSON.stringify(todosRegistros));
}
```

### **Datos Almacenados:**

```json
{
  "id": 1730123456789,
  "fecha": "2025-10-28T15:30:00.000Z",
  "nombre": "Juan Pérez",
  "telefono": "987654321",
  "dni": "12345678",
  "mensaje": "Hola Juan, tenemos una oportunidad laboral...",
  "enviado": true,
  "recibido": false,
  "respondido": false,
  "registrado": false,
  "estado": "enviado"
}
```

---

## 📊 Flujo de Datos: Lectura y Visualización

### **Paso 2: Visualización en Seguimiento SMS**

El reclutador accede a la vista de seguimiento:

```
1. Desde dashboard: Clic en "Seguimiento SMS"
2. O desde módulo SMS: Clic en "Seguimiento"
3. URL: reclutador/seguimiento-sms.html
```

### **Código de Lectura:**

```javascript
function cargarRegistros() {
  // Leer datos desde localStorage
  const datos = localStorage.getItem('smsCampanas');
  
  if (datos) {
    registrosSMS = JSON.parse(datos);
    renderizarTabla();
    actualizarEstadisticas();
  }
}
```

### **Renderizado de Tabla:**

```javascript
function renderizarTabla() {
  registrosSMS.forEach((registro, index) => {
    // Crear fila con todos los campos
    const fila = `
      <tr>
        <td>${index + 1}</td>
        <td>${fecha}</td>
        <td>${registro.nombre}</td>
        <td>${registro.telefono}</td>
        <td>${registro.dni}</td>
        <td>${registro.mensaje.substring(0, 50)}...</td>
        <td>${registro.enviado ? '✓' : '○'}</td>
        <td>${registro.recibido ? '✓' : '○'}</td>
        <td>${registro.respondido ? '✓' : '○'}</td>
        <td>${registro.registrado ? '✓' : '○'}</td>
        <td><badge>${registro.estado}</badge></td>
      </tr>
    `;
  });
}
```

---

## 🎨 Características de la Vista de Seguimiento

### **1. Estadísticas en Tiempo Real**

5 tarjetas con métricas clave:

- **Total Enviados**: Cantidad de SMS enviados
- **Recibidos**: Mensajes confirmados como recibidos
- **Respondidos**: Postulantes que respondieron
- **Registrados**: Usuarios que completaron el registro
- **Tasa de Éxito**: Porcentaje de conversión

### **2. Tabla Interactiva**

Columnas disponibles:

| N° | Fecha/Hora | Nombre | Teléfono | DNI | Mensaje | Enviado | Recibido | Respondido | Registrado | Estado | Acciones |
|----|------------|--------|----------|-----|---------|---------|----------|------------|------------|--------|----------|
| 1  | 28/10 15:30| Juan   | 987654321| 123 | Hola... | ✓       | ✓        | ✓          | ✓          | Badge  | Ver      |

### **3. Filtros Avanzados**

- **Búsqueda**: Por nombre, teléfono o DNI
- **Filtros rápidos**:
  - Todos
  - Enviados
  - Recibidos
  - Respondidos
  - Registrados
  - Errores

### **4. Indicadores Visuales**

Estados con colores:

- 🔵 **Enviado**: Azul - Mensaje enviado exitosamente
- 🟢 **Recibido**: Verde - Postulante recibió el mensaje
- 🟣 **Respondido**: Morado - Postulante respondió
- 🟡 **Registrado**: Amarillo - Usuario completó registro
- ⚫ **Pendiente**: Gris - Sin confirmar
- 🔴 **Error**: Rojo - Problema en envío

### **5. Exportación**

Botón para descargar datos en formato CSV con todos los campos.

---

## 🔄 Estados del SMS

### **Ciclo de Vida Completo:**

```
1. ENVIADO (enviado: true)
   ↓
   Usuario recibe SMS en su teléfono
   ↓
2. RECIBIDO (recibido: true)
   ↓
   Usuario lee y responde al SMS
   ↓
3. RESPONDIDO (respondido: true)
   ↓
   Usuario completa formulario de registro
   ↓
4. REGISTRADO (registrado: true)
```

### **Actualización de Estados:**

En producción, los estados se actualizarían mediante:

- **API de Gateway SMS**: Confirmación de entrega
- **Webhooks**: Respuestas del usuario
- **Integración con formulario**: Al completar registro

Para demostración, la vista incluye botones de simulación:

```javascript
// Simular que todos los enviados fueron recibidos
function simularRecepcion() {
  registrosSMS.forEach(r => {
    if (r.enviado && !r.recibido) {
      r.recibido = true;
      r.estado = 'recibido';
    }
  });
  guardarCambios();
}
```

---

## 📖 Ejemplo Guiado Incluido

La vista incluye un modal de ejemplo con:

### **Sección 1: Inserción de Datos**
- Explicación del código de envío
- Estructura de datos
- Función de guardado

### **Sección 2: Lectura de Datos**
- Código de carga desde localStorage
- Renderizado de tabla
- Actualización de estadísticas

### **Sección 3: Simulación**
- Botones para simular estados:
  - 🟢 Simular Recepción
  - 🟣 Simular Respuesta
  - 🟡 Simular Registro

### **Sección 4: Flujo Completo**
- Diagrama visual del proceso
- 4 pasos con iconos
- Descripción de cada fase

### **Botón de Datos de Ejemplo**

Carga 5 registros de ejemplo con diferentes estados:

```javascript
[
  { nombre: 'Juan Pérez', estado: 'registrado' },
  { nombre: 'María López', estado: 'respondido' },
  { nombre: 'Carlos Ruiz', estado: 'recibido' },
  { nombre: 'Ana Torres', estado: 'enviado' },
  { nombre: 'Luis Mendoza', estado: 'registrado' }
]
```

---

## 🚀 Cómo Usar el Sistema

### **Para Reclutadores:**

#### **1. Enviar Campaña SMS:**

```
1. Dashboard → Módulo SMS
2. Cargar Excel con contactos
3. Escribir mensaje con variables:
   {NOMBRE}, {APELLIDO}, {DNI}, {PUESTO}, {EMPRESA}
4. Clic en "Enviar Campaña"
5. Confirmar envío
```

#### **2. Ver Seguimiento:**

```
1. Dashboard → Seguimiento SMS
   O
   Módulo SMS → Seguimiento
2. Ver tabla con todos los registros
3. Usar filtros y búsqueda
4. Exportar datos si necesario
```

#### **3. Simular Estados (Demo):**

```
1. Clic en "Ver Ejemplo Guiado"
2. Clic en "Cargar Datos de Ejemplo"
3. Usar botones de simulación:
   - Simular Recepción
   - Simular Respuesta
   - Simular Registro
```

---

## 🎯 Navegación Integrada

### **Botones en Dashboard:**

```
[Módulo SMS] [Seguimiento SMS] [Portal Postulante] [Cerrar Sesión]
     ↓              ↓
   Enviar      Ver seguimiento
```

### **Botones en Módulo SMS:**

```
[Dashboard] [Seguimiento]
     ↓            ↓
  Volver      Ver estados
```

### **Botones en Seguimiento SMS:**

```
[📖 Ver Ejemplo Guiado] [Cerrar Sesión]
         ↓
   Modal tutorial
```

---

## 💾 Almacenamiento

### **localStorage Key:**

```javascript
'smsCampanas' // Array con todos los registros SMS
```

### **Persistencia:**

- ✅ Los datos persisten entre sesiones
- ✅ Se acumulan con cada envío
- ✅ Disponibles en toda la aplicación
- ✅ Se pueden exportar a CSV

### **Limpiar Datos:**

Para limpiar todos los registros:

```javascript
localStorage.removeItem('smsCampanas');
location.reload();
```

O desde consola del navegador (F12):

```javascript
localStorage.clear();
```

---

## 📈 Métricas y Analytics

### **Cálculos Automáticos:**

```javascript
// Total enviados
const totalEnviados = registros.filter(r => r.enviado).length;

// Total recibidos
const totalRecibidos = registros.filter(r => r.recibido).length;

// Total respondidos
const totalRespondidos = registros.filter(r => r.respondido).length;

// Total registrados
const totalRegistrados = registros.filter(r => r.registrado).length;

// Tasa de éxito
const tasa = (totalRegistrados / totalEnviados) * 100;
```

### **Visualización:**

- Números grandes con gradiente
- Iconos representativos
- Colores por categoría
- Actualización en tiempo real

---

## 🎨 Diseño UI/UX

### **Características:**

- ✨ Glassmorphism moderno
- 🌈 Gradientes animados de fondo
- 🎯 Indicadores visuales claros
- 📊 Tabla responsiva con scroll
- 🔍 Búsqueda en tiempo real
- 🎭 Estados con badges coloridos
- 📱 Totalmente responsive
- ⚡ Animaciones suaves

### **Paleta de Colores:**

- **Azul** (#60a5fa): Enviado, acciones primarias
- **Verde** (#34d399): Recibido, éxito
- **Morado** (#c084fc): Respondido
- **Amarillo** (#fbbf24): Registrado
- **Gris** (#9ca3af): Pendiente
- **Rojo** (#f87171): Error

---

## 🔧 Personalización

### **Variables de Mensaje:**

Disponibles para usar en SMS:

- `{NOMBRE}` - Nombre del postulante
- `{APELLIDO}` - Apellido
- `{DNI}` - Documento de identidad
- `{PUESTO}` - Cargo al que postula
- `{EMPRESA}` - Nombre de la empresa

### **Función de Personalización:**

```javascript
function personalizarMensaje(mensaje, contacto) {
  return mensaje
    .replace(/{NOMBRE}/g, contacto.nombre || '')
    .replace(/{APELLIDO}/g, contacto.apellido || '')
    .replace(/{DNI}/g, contacto.dni || '')
    .replace(/{PUESTO}/g, contacto.puesto || '')
    .replace(/{EMPRESA}/g, contacto.empresa || 'Liderman');
}
```

---

## 🚦 Estados de Validación

### **En Envío:**

- ✅ Debe haber contactos cargados
- ✅ Debe haber mensaje escrito
- ✅ Confirmar antes de enviar

### **En Seguimiento:**

- 📊 Mostrar tabla vacía con mensaje si no hay datos
- 🎯 Ofrecer cargar datos de ejemplo
- 📖 Botón visible para ver tutorial

---

## 🎓 Tutorial Integrado

### **Acceso:**

Botón morado en navbar: **"📖 Ver Ejemplo Guiado"**

### **Contenido del Modal:**

1. **Paso 1**: Inserción de datos (código)
2. **Paso 2**: Lectura de datos (código)
3. **Paso 3**: Simulación de estados (botones interactivos)
4. **Paso 4**: Flujo completo (diagrama visual)

### **Botones de Acción:**

- 🚀 **Cargar Datos de Ejemplo**: Inserta 5 registros demo
- ❌ **Cerrar**: Cierra el modal

---

## 📱 Responsive Design

### **Breakpoints:**

- **Mobile** (< 768px): Tabla con scroll horizontal
- **Tablet** (768px - 1024px): Grid 2 columnas
- **Desktop** (> 1024px): Grid completo, 5 stats cards

### **Ajustes Móviles:**

- Stats cards en columna
- Filtros en dos filas
- Tabla con scroll horizontal
- Botones apilados

---

## ⚡ Performance

### **Optimizaciones:**

- ✅ Paginación (10 registros por página)
- ✅ Búsqueda local eficiente
- ✅ Renderizado bajo demanda
- ✅ localStorage en lugar de API
- ✅ Sin recargas de página

### **Límites:**

- localStorage: ~5MB
- Registros recomendados: < 1000
- Búsqueda: Instant hasta 500 registros

---

## 🎯 Próximas Mejoras (Producción)

### **Integraciones:**

- [ ] API de Gateway SMS real
- [ ] Webhooks para confirmaciones
- [ ] Base de datos en backend
- [ ] Notificaciones push
- [ ] Reportes avanzados

### **Funcionalidades:**

- [ ] Programar envíos
- [ ] Plantillas guardadas
- [ ] Segmentación avanzada
- [ ] AB Testing de mensajes
- [ ] Dashboard de analytics

---

## 🆘 Soporte y Troubleshooting

### **Problema: No se ven registros**

**Solución:**
1. Verifica que hayas enviado mensajes desde el módulo SMS
2. O carga datos de ejemplo desde el tutorial
3. Verifica localStorage en DevTools (F12)

### **Problema: Datos no persisten**

**Solución:**
1. Verifica que localStorage esté habilitado
2. No uses modo incógnito
3. Revisa permisos del navegador

### **Problema: Tabla no responsive**

**Solución:**
1. Usa scroll horizontal en móvil
2. Zoom out si es necesario
3. Rota dispositivo a horizontal

---

## 📞 Contacto

Para soporte técnico o consultas:

- **Email**: soporte@liderman.com
- **Teléfono**: 01-6304000
- **Web**: www.liderman.com.pe

---

## 📄 Licencia

© 2025 Liderman - Sistema de Reclutamiento SMS
Todos los derechos reservados.

---

**Versión**: 1.0.0
**Última actualización**: 28 de Octubre, 2025
**Autor**: Sistema Liderman SMS
