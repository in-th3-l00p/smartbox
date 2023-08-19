import {Authority, User} from "../utils/dtos";
import api from "../utils/api";
import {isAuthenticated} from "./authenticate";
import {AxiosError} from "axios";

// returns all the users that are registered
export async function getUsers(): Promise<User[]> {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.get("/admin/users");
        return response.data;
    } catch (error) {
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}

export async function createUser(
  username: string,
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  authority: Authority
): Promise<User> {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post("/admin/users", {
      login: username,
      firstName,
      lastName,
      address,
      email,
      authorities: [authority]
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400)
      throw new Error("Emailul sau numele de utilizator este deja folosit.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function updateUserDetails(
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  authority: Authority
) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.put("/admin/users", {
      id,
      login: username,
      firstName,
      lastName,
      address,
      email,
      authorities: [authority]
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400)
      throw new Error("Emailul sau numele de utilizator este deja folosit.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
