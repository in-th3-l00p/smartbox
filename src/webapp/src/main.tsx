import React from 'react'
import ReactDOM from 'react-dom'
import "./styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout from "./components/Layout";
import Profile from "./routes/Profile";

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
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
)
