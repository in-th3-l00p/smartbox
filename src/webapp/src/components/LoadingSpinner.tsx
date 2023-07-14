import React from "react";
import {Spinner} from "react-bootstrap";

// used for showing that a page is loading
const LoadingSpinner: React.FC = () => {
  return (
    <div className={"text-center py-5 mx-auto"}>
      <h1>Loading...</h1>
      <Spinner animation={"border"} />
    </div>
  );
}

export default LoadingSpinner;
