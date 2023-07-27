import api from "../utils/api";
import {isAuthenticated} from "./authenticate";
import {getAuthenticationHeader} from "../utils/auth";

export async function getAllDeviceLogs() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.get(
      "/admin/deviceLog/all",
      {headers: getAuthenticationHeader()}
    );

    return response.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
