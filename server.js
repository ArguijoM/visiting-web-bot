// server.js
import express from "express";
import { startBot } from "./bot.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Endpoint de salud (usado por ping externo)
app.get("/", (req, res) => {
  res.send("visiting-web-bot: alive");
});

// Puedes añadir un endpoint para ver estado o logs sencillos
app.get("/status", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Arranca el servidor HTTP
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Arranca el bot que hace las visitas
startBot();
