// bot.js
// Código principal de visitas — exporta startBot() para que server.js lo invoque.

const TARGETS = [
  "https://purchase-request-status.onrender.com",
  "https://projects-visualizer.onrender.com"
];

// Ajusta la zona horaria y valida horario laboral (México CDMX)
function dentroHorario() {
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
  );

  const hora = ahora.getHours();
  const dia = ahora.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab

  // Lunes a viernes, entre 6 AM y 10 PM
  return dia >= 1 && dia <= 5 && hora >= 6 && hora < 22;
}

async function visitarPagina(url) {
  if (!dentroHorario()) {
    console.log("⏸️ Fuera de horario laboral:", new Date().toLocaleString("es-MX"));
    return;
  }

  try {
    // Node 18+ tiene fetch global. Si usas Node <18, instala node-fetch y cambia aquí.
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) VisitingWebBot/1.0"
      },
      //timeout: 15000 // si quieres un timeout, necesitarías AbortController
    });

    console.log(`✅ Visita a ${url}: ${response.status} - ${new Date().toLocaleString("es-MX")}`);
  } catch (error) {
    console.error(`⚠️ Error visitando ${url}:`, error && error.message ? error.message : error);
  }
}

// Crea un ciclo independiente por cada URL
function iniciarCiclo(url) {
  async function ciclo() {
    await visitarPagina(url);
    const minutos = Math.floor(Math.random() * 14) + 1; // entre 1 y 14 minutos
    console.log(`🔁 Próxima visita a ${url} en ${minutos} minuto(s)\n`);
    setTimeout(ciclo, minutos * 60 * 1000);
  }
  ciclo(); // primera ejecución inmediata
}

// Función pública para arrancar todos los ciclos
export function startBot(customTargets) {
  const targets = Array.isArray(customTargets) && customTargets.length ? customTargets : TARGETS;
  console.log("► Iniciando visiting-web-bot. Targets:", targets);
  for (const url of targets) {
    iniciarCiclo(url);
  }
}
