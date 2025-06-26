import OpenAI from "openai";
import { Content } from "openai/resources/containers/files.mjs";
import systemMessageAtendente from "./systemMessageAtendente.js";
import dotenv from "dotenv";
dotenv.config();




const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY_ATENDENTE
});


const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "system",
            content: systemMessageAtendente,
        },
        {
            role: "user",
            content: "detalhe esse nike air max 90" 
        }
    ],
    store: true,
});

console.log(response.choices[0].message.content);
