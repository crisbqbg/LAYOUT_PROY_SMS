// ===================================
// SISTEMA DE RECLUTAMIENTO SMS - LIDERMAN
// ===================================

// ===================================
// Login Administrativo (index.html)
// ===================================
function login() {
  const user = document.getElementById('user')?.value.trim();
  const pass = document.getElementById('pass')?.value.trim();

  if (!user || !pass) {
    alert("⚠️ Por favor, ingresa usuario y contraseña");
    return;
  }

  // Credenciales de postulante
  if (user === "u123" && pass === "u123") {
    window.location.href = "landing.html";
  } 
  // Credenciales de reclutador
  else if (user === "r123" && pass === "r123") {
    window.location.href = "reclutador.html";
  } 
  else {
    alert("❌ Usuario o contraseña incorrectos");
  }
}

// ===================================
// Variables globales
// ===================================
let postulantes = [];
let postulanteActual = null;

// ===================================
// Funciones de Postulante (Legacy)
// ===================================

// Inicializar formulario de registro (postulante.html legacy)
if (document.getElementById('formRegistro')) {
  document.getElementById('formRegistro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const postulante = {
      id: Date.now(),
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      cargo: document.getElementById('cargo').value,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString()
    };
    
    // Guardar en localStorage
    let postulantes = JSON.parse(localStorage.getItem('postulantes') || '[]');
    postulantes.push(postulante);
    localStorage.setItem('postulantes', JSON.stringify(postulantes));
    
    // Mostrar sección de confirmación
    mostrarSeccion('confirmacion');
    
    // Limpiar formulario
    document.getElementById('formRegistro').reset();
  });
}

// Inicializar chatbot (legacy)
if (document.getElementById('btnEnviar')) {
  document.getElementById('btnEnviar').addEventListener('click', enviarMensaje);
  document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  });
}

function enviarMensaje() {
  const input = document.getElementById('chatInput');
  const mensaje = input?.value.trim();
  
  if (mensaje) {
    agregarMensaje(mensaje, 'usuario');
    input.value = '';
    
    // Simular respuesta del bot
    setTimeout(() => {
      const respuesta = obtenerRespuestaBot(mensaje);
      agregarMensaje(respuesta, 'bot');
    }, 1000);
  }
}

function agregarMensaje(texto, tipo) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const mensaje = document.createElement('div');
  mensaje.className = `mensaje mensaje-${tipo}`;
  mensaje.style.cssText = `
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    max-width: 70%;
    ${tipo === 'usuario' ? 'margin-left: auto; background-color: #3b82f6; color: white; text-align: right;' : 'background-color: #e5e7eb;'}
  `;
  mensaje.textContent = texto;
  chatMessages.appendChild(mensaje);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function obtenerRespuestaBot(mensaje) {
  const respuestas = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'requisitos': 'Los requisitos básicos son: ser mayor de edad, tener DNI vigente y disponibilidad para trabajar en turnos.',
    'proceso': 'El proceso de selección incluye: registro, entrevista telefónica, evaluación y capacitación.',
    'contacto': 'Puedes contactarnos al teléfono (01) 123-4567 o al email rrhh@liderman.com.pe',
    'horario': 'Los horarios son rotativos de 12x12 (12 horas trabajo, 12 descanso).',
    'sueldo': 'El sueldo base es de S/1,800 a S/2,200 mensuales más beneficios.',
    'beneficios': 'Incluimos: movilidad, uniformes, seguro EsSalud, bonos por puntualidad y capacitaciones.'
  };
  
  const mensajeLower = mensaje.toLowerCase();
  for (let key in respuestas) {
    if (mensajeLower.includes(key)) {
      return respuestas[key];
    }
  }
  
  return 'Gracias por tu mensaje. Un reclutador revisará tu consulta pronto.';
}

function mostrarSeccion(seccionId) {
  const secciones = document.querySelectorAll('.section');
  secciones.forEach(seccion => {
    seccion.classList.remove('active');
    seccion.style.display = 'none';
  });
  
  const seccionActiva = document.getElementById(seccionId);
  if (seccionActiva) {
    seccionActiva.classList.add('active');
    seccionActiva.style.display = 'block';
  }
}

// ===================================
// Funciones de Reclutador
// ===================================

// Cargar postulantes al iniciar (reclutador.html)
if (document.getElementById('tablaPostulantesData')) {
  cargarPostulantes();
}

function cargarPostulantes() {
  // Cargar tanto de postulantes (legacy) como de registros (nuevo sistema)
  const postulantesLegacy = JSON.parse(localStorage.getItem('postulantes') || '[]');
  const registrosNuevos = JSON.parse(localStorage.getItem('registros') || '[]');
  
  // Combinar ambos
  postulantes = [...postulantesLegacy];
  
  // Convertir registros nuevos al formato de postulantes
  registrosNuevos.forEach(reg => {
    postulantes.push({
      id: Date.now() + Math.random(),
      nombre: `${reg.nombres} ${reg.apellidos}`,
      email: reg.email,
      telefono: reg.telefono,
      cargo: reg.cargo,
      estado: reg.estado || 'Nuevo interesado',
      fecha: new Date(reg.fechaRegistro).toLocaleDateString(),
      reclutador: reg.reclutadorNombre || 'No asignado'
    });
  });
  
  const tbody = document.querySelector('#tablaPostulantesData tbody');
  if (!tbody) return;
  
  if (postulantes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="no-data">No hay postulantes registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = '';
  postulantes.forEach(postulante => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${postulante.id}</td>
      <td>${postulante.nombre}</td>
      <td>${postulante.email}</td>
      <td>${postulante.telefono}</td>
      <td>${postulante.cargo}</td>
      <td><span class="badge badge-${postulante.estado.toLowerCase().replace(' ', '-')}">${postulante.estado}</span></td>
      <td><button class="btn btn-sm" onclick="verDetalle(${postulante.id})">Ver detalle</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function verDetalle(id) {
  const postulante = postulantes.find(p => p.id === id);
  if (!postulante) return;
  
  postulanteActual = postulante;
  
  document.getElementById('detalleNombre').textContent = postulante.nombre;
  document.getElementById('detalleEmail').textContent = postulante.email;
  document.getElementById('detalleTelefono').textContent = postulante.telefono;
  document.getElementById('detalleCargo').textContent = postulante.cargo;
  document.getElementById('detalleEstado').textContent = postulante.estado;
  document.getElementById('detalleFecha').textContent = postulante.fecha;
  
  document.getElementById('detallePostulante')?.classList.remove('hidden');
  const tabla = document.getElementById('tablaPostulantes');
  if (tabla) tabla.style.display = 'none';
}

function cerrarDetalle() {
  document.getElementById('detallePostulante')?.classList.add('hidden');
  const tabla = document.getElementById('tablaPostulantes');
  if (tabla) tabla.style.display = 'block';
  postulanteActual = null;
}

// ===================================
// Funciones del nuevo sistema
// ===================================

function loginWithGoogle() {
  // Simulación de login con Google OAuth
  console.log('🔐 Iniciando login con Google...');
  
  // En producción, aquí iría la integración real con Google OAuth 2.0
  alert('🔐 Conectando con Google...\n\nEn producción, aquí se integraría Google OAuth 2.0');
  
  // Simular datos precargados de Google
  setTimeout(() => {
    sessionStorage.setItem('userData', JSON.stringify({
      nombre: 'Usuario de Google',
      email: 'usuario@gmail.com',
      loginMethod: 'google'
    }));
    window.location.href = 'formulario.html?prefilled=true';
  }, 1000);
}

function contactWhatsApp() {
  const phone = '51930973745'; // Número de WhatsApp de Liderman
  const message = encodeURIComponent('Hola, estoy interesado en postular a Liderman. ¿Me pueden ayudar?');
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// ===================================
// Validaciones comunes
// ===================================

function validarDNI(dni) {
  return /^\d{8}$/.test(dni);
}

function validarTelefono(telefono) {
  return /^\d{9}$/.test(telefono);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===================================
// Utilidades
// ===================================

function formatearFecha(fecha) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(fecha).toLocaleDateString('es-PE', options);
}

function generarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// ===================================
// Inicialización
// ===================================
console.log('✅ Sistema Liderman SMS - Inicializado');
console.log('📦 Postulantes en storage:', JSON.parse(localStorage.getItem('postulantes') || '[]').length);
console.log('📦 Registros en storage:', JSON.parse(localStorage.getItem('registros') || '[]').length);

// Debug helper - solo en desarrollo
window.limpiarStorage = function() {
  localStorage.clear();
  sessionStorage.clear();
  console.log('🗑️ Storage limpiado');
  location.reload();
};

window.verStorage = function() {
  console.log('📊 Postulantes:', JSON.parse(localStorage.getItem('postulantes') || '[]'));
  console.log('📊 Registros:', JSON.parse(localStorage.getItem('registros') || '[]'));
  console.log('📊 Session:', {
    postulanteData: JSON.parse(sessionStorage.getItem('postulanteData') || '{}'),
    registroCompleto: JSON.parse(sessionStorage.getItem('registroCompleto') || '{}')
  });
};

console.log('💡 Tip: Usa limpiarStorage() para limpiar datos de prueba');
console.log('💡 Tip: Usa verStorage() para ver todos los datos almacenados');

