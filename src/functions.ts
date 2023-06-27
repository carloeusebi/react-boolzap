import { ContactObj } from "./data";
import { Message } from "./data";
import axios from "axios";
import APY_KEY from "./auth";

const getNewMessageId = (contact: ContactObj) => contact.messages.reduce((highest, { id }) => id > highest ? id : highest, 0) + 1;

const getCurrentTime = () => {
    const d:Date = new Date();
    const date: string = d.toLocaleDateString();
    const time: string = d.toLocaleTimeString();

    return date + ' ' + time;
}

export const createNewMessage = (contact: ContactObj, message: string, status: string) => {
    const id:number = getNewMessageId(contact);
    const date:string = getCurrentTime();
    return { id, message, status, date };
}

const getGptResponse = async (userName: string, contact: ContactObj) => {
    const getChatHistory = (userName: string, contact: ContactObj) => {
        // initialize chatgpt chat history to be sent to chatgpt for context;
        // first object in the array is the initial prompt with the instructions for chatgpt
        const completeChat = [{
            role: "system",
            content: `Fingiamo una conversazione whatsapp, user si chiama ${userName} e assistant ${contact.name}, ricordati di fingere una versa persona e non un language model`
        }];

        // completes the array to send to chatgpt mounting our messages obj in a format that chatgpt accepts
        contact.messages.forEach(({ message, status }) => {
            const role = status === 'sent' ? 'user' : 'assistant';
            completeChat.push({ role, content: message });
        });

        return completeChat;
    }

    const url: string = 'https://api.openai.com/v1/chat/completions';
    const messages = getChatHistory(userName, contact);

    const options = {
        method: 'POST',
        url,
        data: {
            temperature: 0.9,
            messages,
            model: 'gpt-3.5-turbo'
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + APY_KEY
        }
    };

    let message = '';

    try {
        const response = await axios.request(options);
        message = response.data.choices[0].message.content;
    } catch (e) {
        if (axios.isAxiosError(e)) {            
            console.error(e);
            message = `${e.message}`;
            if (e.response)
                message += `<br>${ e.response.data.error.message }`;
        }
    }


    return message;
}

export const getResponse = async (userName: string, contact: ContactObj) => {
    // The default message with instruction on how to get and 'install' a key
    let message = `Non è stata rilevata nessuna API KEY per chat GPT, quindi non potrà rispondere.<br>
    Per poter attivare chatGPT creare un file auth.js nella cartella JS ed inserire la propria chiave in una variabile con il nome KEY.<br><br>
    Per ottenere una API Key per OpenAI devi seguire questi passaggi: 1. Vai sul sito di OpenAI 2. Clicca sul pulsante "Sign Up for GPT-3" 3. Inserisci il tuo indirizzo email e premi su "Get Access" 4. Compila il form con le informazioni richieste e seleziona il tipo di utilizzo che intendi fare della piattaforma 5. Premi "Apply" 6. Dovresti ricevere un'email di risposta con le istruzioni per accedere alla dashboard di OpenAI e ottenere la tua API Key Spero di esserti stato utile!`;

    // if an api key is found it will ask chatgpt to generate a response
    if (APY_KEY) {
        message = await getGptResponse(userName, contact);
    }

    return message;
}
