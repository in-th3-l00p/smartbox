import api from "../utils/api";
import {AxiosError} from "axios";

export async function register(
  username: string,
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/register", {
      login: username, firstName, lastName, address, email, password
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status == 400)
      throw new Error("Invalid register data");
    throw new Error("Serverside error. Please try again later.");
  }
}
