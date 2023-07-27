import {User} from "../utils/dtos";
import api from "../utils/api";
import {getAuthenticationHeader} from "../utils/auth";
import {isAuthenticated} from "./authenticate";

// returns all the users that are registered
export async function getUsers(): Promise<User[]> {
    if (!(await isAuthenticated()))
        throw new Error("Nu eşti autentificat.");
    try {
        const response = await api.get("/admin/users", {headers: getAuthenticationHeader()});
        return response.data;
    } catch (error) {
        throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
    }
}
