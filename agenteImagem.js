import OpenAI from "openai";
import systemMessageImagem from "./systemMessageImagem.js";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY_IMAGEM
});

const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "system",
            content: systemMessageImagem,
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "O que há nessa foto?"
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLeVnNKgkeupwPtgtZvvmkQEEnwQeAUjjOuw&s"
                    }
                }
            ]
        }
    ]
});

console.log(response.choices[0].message.content);
