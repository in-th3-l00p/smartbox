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
      error.response?.status === 401
    )
      throw new Error("Invalid username or password");
    else
      throw new Error("Serverside error. Please try again later.");
  }
}

// will be a call to the api when the cookie based authentication is implemented
export async function logout() {
  localStorage.removeItem("token");
}
