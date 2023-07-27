import api from "../utils/api";
import {Contact} from "../utils/dtos";

export async function sendContact(data: Contact) {
  return await api.post("/public/contact", data);
}
