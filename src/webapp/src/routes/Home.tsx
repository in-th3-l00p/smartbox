import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Home = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated && auth.userDetails.authorities.includes("ROLE_ADMIN"))
    return <AdminDashboard />
  else if (auth.isAuthenticated && auth.userDetails.authorities.includes("ROLE_USER"))
    return <UserDashboard />
  return (
    <p>hello</p>
  );
}

export default Home;
