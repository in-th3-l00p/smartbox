import React from "react";
import {Alert, Container} from "react-bootstrap";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit?: (data: EventTarget) => void;
  error?: Error;
  children: JSX.Element | JSX.Element[];
}

const AuthForm: React.FC<AuthFormProps> = ({ error, onSubmit, type, children }) => {
  return (
    <Container className={"mt-3"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit !== undefined)
            onSubmit(e.target);
      }}>
        <h1 className={"text-center"}>{type === "login" ? "Login" : "Register"}</h1>
        {error !== undefined && (
          <Alert variant={"danger"} dismissible>{error.message}</Alert>
        )}
        <div className={"d-flex flex-column my-3 gap-3"}>
          {children}
        </div>
      </form>
    </Container>
  )
}

export default AuthForm;
