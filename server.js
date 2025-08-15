import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// Import both personas
import { hiteshPersona } from './hitesh.js';
import { piyushPersona } from './piyush.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Map persona_id to persona object
const personas = {
  hitesh: hiteshPersona,
  piyush: piyushPersona
};

app.post('/chat', async (req, res) => {
  try {
    const { message, personaId } = req.body;

    const persona = personas[personaId] || hiteshPersona; // default to Hitesh if not found

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: "system", content: persona.system_instruction },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error communicating with AI" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
