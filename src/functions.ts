import { ContactObj } from "./data";
import { Message } from "./data";

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
