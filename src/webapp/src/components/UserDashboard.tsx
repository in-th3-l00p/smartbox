import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const UserDashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <p>user dashboard</p>
  );
}

export default UserDashboard;