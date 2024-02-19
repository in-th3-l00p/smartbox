import api from "../utils/api"
import {isAuthenticated} from "./authenticate";
import {Notification} from "../utils/dtos";

export async function updateNotificationStatus(notificationId:number){
  if(!await isAuthenticated())
    throw new Error("Nu esti autentificat.");
  try {
    const response = await api.put(
      `/operator/${notificationId}`,
      {
        finished : true
      }
    )
  } catch (error){
    throw new Error("Eroare în cadrul serverului. Vă rugăm să încercați mai târziu.");
  }
}
