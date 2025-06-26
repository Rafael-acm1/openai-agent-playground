import OpenAI from "openai";
import systemMessageImagem from "./systemMessageImagem.js";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY_IMAGEM
});

export async function runImagem(userText, imageUrl) {
  const userContent = [];
  if (userText) {
    userContent.push({ type: "text", text: userText });
  }
  if (imageUrl) {
    userContent.push({ type: "image_url", image_url: { url: imageUrl } });
  }
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessageImagem,
      },
      {
        role: "user",
        content: userContent,
      },
    ],
  });
  return response.choices[0].message.content;
}

