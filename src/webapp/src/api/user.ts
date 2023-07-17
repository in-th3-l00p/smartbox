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
      throw new Error(error.response.data.detail || "Completarea datelor a fost incorectă.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

// returns the details of the current authenticated user
export async function getCurrentUserDetails() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.get(
      "/account",
      {headers: getAuthenticationHeader()}
    );
    return response.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function updateCurrentUser(
  login: string,
  firstName: string,
  lastName: string,
  address: string,
  email: string
) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post(
      "/account",
      {login, firstName, lastName, address, email},
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
      throw new Error(error.response.data.detail || "Completarea datelor a fost incorectă.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function changeCurrentUserPassword(
  currentPassword: string,
  newPassword: string
) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.post(
      "/account/change-password",
      {currentPassword, newPassword},
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
      throw new Error(error.response.data.detail || "Completarea datelor a fost incorectă.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}