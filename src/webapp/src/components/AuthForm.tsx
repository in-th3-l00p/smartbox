import React from "react";
import {Alert, Container} from "react-bootstrap";

interface AuthFormProps {
  title: string,
  onSubmit?: (data: EventTarget) => void;
  error?: Error;
  setError?: React.Dispatch<React.SetStateAction<Error | undefined>>;
  children: JSX.Element | JSX.Element[];
}

const AuthForm: React.FC<AuthFormProps> = ({ title, error, setError, onSubmit, children }) => {
  return (
    <Container className={"mt-3"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit !== undefined)
            onSubmit(e.target);
      }}>
        <h1 className={"text-center"}>{title}</h1>
        {(error !== undefined && setError != undefined) && (
          <Alert
            variant={"danger"}
            onClose={() => setError(undefined)}
            dismissible
          >
            {error.message}
          </Alert>
        )}
        <div className={"d-flex flex-column my-3 gap-3"}>
          {children}
        </div>
      </form>
    </Container>
  )
}

export default AuthForm;
