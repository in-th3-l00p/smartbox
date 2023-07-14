import api from "../utils/api";
import {AxiosError} from "axios";
import {isAuthenticated} from "./authenticate";
import {getAuthenticationHeader} from "../utils/auth";

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
      throw new Error(error.response.data.detail || "Invalid input");
    throw new Error("Serverside error. Please try again later.");
  }
}

// returns the details of the current authenticated user
export async function getCurrentUserDetails() {
  if (!(await isAuthenticated()))
    throw new Error("You are not authenticated");
  try {
    const response = await api.get(
      "/account",
      {headers: getAuthenticationHeader()}
    );
    return response.data;
  } catch (error) {
    throw new Error("Serverside error. Please try again later.");
  }
}

export async function updateCurrentUser(
  firstName: string,
  lastName: string,
  address: string,
  email: string
) {
  if (!(await isAuthenticated()))
    throw new Error("You are not authenticated");
  try {
    const response = await api.post(
      "/account",
      {firstName, lastName, address, email},
      {headers: getAuthenticationHeader()}
    );
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (
        error.response?.status === 400 ||
        error.response?.status === 500
      ))
      throw new Error(error.response.data.detail || "Invalid input");
    throw new Error("Serverside error. Please try again later.");
  }
}
