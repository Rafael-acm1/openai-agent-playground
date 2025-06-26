import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { runAtendente } from "../agenteAtendente.js";
import { runImagem } from "../agenteImagem.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/atendente", async (req, res) => {
  const { message } = req.body;
  try {
    const resposta = await runAtendente(message);
    res.json({ response: resposta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/imagem", async (req, res) => {
  const { message, imageUrl } = req.body;
  try {
    const resposta = await runImagem(message, imageUrl);
    res.json({ response: resposta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
