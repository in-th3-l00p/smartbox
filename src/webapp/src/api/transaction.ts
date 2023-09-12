import api from "../utils/api";
import {isAuthenticated} from "./authenticate";

export async function getAllTransactions() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.get("/admin/transaction/all");
    return response.data.map((transaction: any) => {
      transaction.createdDate = new Date(transaction.createdDate);
      return transaction;
    });
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}

export async function getCurrentUserTransactions() {
  if (!(await isAuthenticated()))
    throw new Error("Nu eşti autentificat.");
  try {
    const response = await api.get("/transaction");
    const transaction = response.data;
    transaction.createdDate = new Date(transaction.createdDate);
    return transaction;
  } catch (error) {
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
