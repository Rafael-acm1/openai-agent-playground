import OpenAI from "openai";
import { Content } from "openai/resources/containers/files.mjs";
import systemMessageAtendente from "./systemMessageAtendente.js";
import dotenv from "dotenv";
dotenv.config();




const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY_ATENDENTE
});


export async function runAtendente(userInput) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessageAtendente,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    store: true,
  });
  return response.choices[0].message.content;
}
