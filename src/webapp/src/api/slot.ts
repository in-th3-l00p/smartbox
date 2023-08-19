import {isAuthenticated} from "./authenticate";
import api from "../utils/api";
import {AxiosError} from "axios";

export async function addSlot(name: string, deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post(
      "/admin/slot/" + deviceId,
      {}, { params: { name } }
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
    const response = await api.delete("/admin/slot/" + slotId);
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
