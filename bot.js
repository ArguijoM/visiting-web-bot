function dentroHorario() {
  // Fecha ajustada a zona horaria de México
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
  );

  const hora = ahora.getHours();
  const dia = ahora.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab

  // Lunes a viernes, entre 6 AM y 10 PM
  return dia >= 1 && dia <= 5 && hora >= 6 && hora < 22;
}

async function visitarPagina(url) {
  if (dentroHorario()) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });
      console.log(`✅ Visita a ${url}: ${response.status} -`, new Date().toLocaleString("es-MX"));
    } catch (error) {
      console.error(`⚠️ Error visitando ${url}:`, error.message);
    }
  } else {
    console.log("⏸️ Fuera de horario laboral:", new Date().toLocaleString("es-MX"));
  }
}

// Función que maneja los ciclos de cada página por separado
function iniciarCiclo(url) {
  async function ciclo() {
    await visitarPagina(url);
    const minutos = Math.floor(Math.random() * 14) + 1; // entre 1 y 14
    console.log(`🔁 Próxima visita a ${url} en ${minutos} minuto(s)\n`);
    setTimeout(ciclo, minutos * 60 * 1000);
  }

  ciclo(); // primera ejecución inmediata
}

// Iniciar ciclos independientes para ambas páginas
iniciarCiclo("https://purchase-request-status.onrender.com");
iniciarCiclo("https://projects-visualizer.onrender.com");
