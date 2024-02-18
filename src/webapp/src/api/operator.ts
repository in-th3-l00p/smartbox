import api from "../utils/api";
import {isAuthenticated} from "./authenticate";

export async function getNotifications()   {
if(!(await isAuthenticated()))
  throw new Error("Nu eşti autentificat.");
try {
  const response = await api.get("/notifications")
  return response.data;
} catch(error){

}
}
