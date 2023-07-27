import {isAuthenticated} from "./authenticate";
import api from "../utils/api";
import {getAuthenticationHeader} from "../utils/auth";
import {AxiosError} from "axios";

export async function addSlot(deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post(
      "/admin/slot/" + deviceId,
      {}, {
        headers: getAuthenticationHeader()
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      throw new Error("Dispozitivul nu există.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function removeSlot(slotId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.delete(
      "/admin/slot/" + slotId,
      {headers: getAuthenticationHeader()}
    );
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
