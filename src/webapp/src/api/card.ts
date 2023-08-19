import api from "../utils/api";
import {isAuthenticated} from "./authenticate";

export async function createCard(userId: number, deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post(
      "/admin/card",
      {},
      {
        params: {userId, deviceId}
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function updateCard(cardId: number, deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.put(
      `/admin/card/${cardId}`,
      {},
      {
        params: {deviceId}
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function deleteCard(cardId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    await api.delete(`/admin/card/${cardId}`);
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
