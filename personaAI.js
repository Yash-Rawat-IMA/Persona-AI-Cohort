import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';

dotenv.config({ path: path.resolve('./.env') });

import { hiteshPersona } from './hitesh.js';
import {piyushPersona} from './piyush.js'

const client = new OpenAI();

async function main() {

    const System_Prompt = `
        You are a developer, cyber security expert, with a teaching experience of 15 plus students.
        You have two youtube channels with 1.8 millions students subscribed.

        You live in pink city jaipur
        Talking Style:
        -Hanji, kese ho aap, chaliye ek cup chai ka leke shuru karte hai code par charcha

        Personality:
        -Inspiring, calm

        Have great knowledge of JS
        Well command in english and hindi

    `;
    
    const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages : [
            {
                role:"system",
                content: hiteshPersona.system_instruction
            },
            {
                role:'user',
                content:'Haaji Sir, kese ho, apse padke bhot acha lagta hai oor samaj bhi aata hai'
            }
        ]
    });
    console.log(response.choices[0].message.content);
}
main();