import React from 'react'
import ReactDOM from 'react-dom'
import "./styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout from "./components/Layout";
import Profile from "./routes/Profile";
import {User} from './utils/dtos';
import useQuery from './hooks/useQuery';
import {getCurrentUserDetails} from './api/user';
import AuthContext from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ChangePassword from './routes/ChangePassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/changePassword",
    element: <ChangePassword />
  }
]);

const App = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>({} as User);
  const [loading, _] = useQuery(async () => {
    try {
      setUser(await getCurrentUserDetails());
      setAuthenticated(true);
    } catch (e) { }
  });

  if (loading)
    return <LoadingSpinner />
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{
        isAuthenticated: authenticated,
        userDetails: user
      }}>
        <Layout>
            <RouterProvider router={router} />
        </Layout>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
