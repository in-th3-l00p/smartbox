import api from "../utils/api";
import {isAuthenticated} from "./authenticate";
import {getAuthenticationHeader} from "../utils/auth";
import {AxiosError} from "axios";

export async function getDevices() {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.get(
            "/admin/device/all",
            {headers: getAuthenticationHeader()}
        );
        return response.data;
    } catch (error) {
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}

export async function createDevice(name: string, location: string) {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.post(
            "/admin/device",
            {name, location},
            {headers: getAuthenticationHeader()}
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400)
            throw new Error("Dispozitivul există deja.");
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}

export async function deleteDevice(deviceId: number) {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.delete(
            `/admin/device/${deviceId}`,
            {headers: getAuthenticationHeader()}
        );
    } catch (error) {
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}

export async function updateDevice(deviceId: number, name: string, location: string) {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.put(
            `/admin/device/${deviceId}`,
            {name, location},
            {headers: getAuthenticationHeader()}
        );
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400)
            throw new Error("Numele dispozitivului există deja.");
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}
