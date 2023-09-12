import api from "../utils/api";
import {AxiosError} from "axios";

export async function authenticate(username: string, password: string) {
  try {
    const response = await api.post("/authenticate", {username, password})

    // currently storing the jwt as a local session
    // todo: implement a cookie based authentication
    localStorage.setItem("token", response.data.id_token);
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 ||
      error.response?.status === 400)
    )
      throw new Error("Nume de utilizator sau parolă greșită.");
    else
      throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

// will be a call to the api when the cookie based authentication is implemented
export async function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

export async function isAuthenticated() {
  try {
    const resp = await api.get("/authenticate");
    return true;
  } catch (error) {
    return false;
  }
}
