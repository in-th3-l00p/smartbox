import api from "../utils/api";
import {isAuthenticated} from "./authenticate";
import {AxiosError} from "axios";
import {Device, DeviceCoordinate} from "../utils/dtos";

export async function getDevices(): Promise<Device[]> {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.get("/admin/device/all");
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
            {name, location}
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
        const response = await api.delete(`/admin/device/${deviceId}`);
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
            {name, location}
        );
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400)
            throw new Error("Numele dispozitivului există deja.");
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}

export async function getDeviceCoordinates(): Promise<DeviceCoordinate[]> {
  return (await api.get("/public/device/coordinate")).data;
}
