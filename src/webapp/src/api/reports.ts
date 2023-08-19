import api from '../utils/api';
import {isAuthenticated} from "./authenticate";
import {ReportDisplay} from "../utils/dtos";
import {AxiosError} from "axios";

export async function getUserReports() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get('/report/user/all');
    resp.data.forEach((report: ReportDisplay) => report.createdAt = new Date(report.createdAt));
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function getDeviceReports() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get('/report/device/all');
    resp.data.forEach((report: ReportDisplay) => report.createdAt = new Date(report.createdAt));
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
export async function getUserDeviceReports() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get('/report/userDevice/all');
    resp.data.forEach((report: ReportDisplay) => report.createdAt = new Date(report.createdAt));
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function getUserReport(id: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get(`/report/user/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function getDeviceReport(id: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get(`/report/device/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function getUserDeviceReport(id: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const resp = await api.get(`/report/userDevice/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function createUserReport(userId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    await api.post(`/report/user/${userId}`);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      throw new Error("Utilizatorul nu are un card.");
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
export async function createDeviceReport(deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    await api.post(`/report/device/${deviceId}`);
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
export async function createUserDeviceReport(deviceId: number) {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    await api.post(`/report/userDevice/${deviceId}`);
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
