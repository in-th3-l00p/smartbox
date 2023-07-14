import React from "react";
import {FloatingLabel, Form} from "react-bootstrap";

interface LabeledInputProps {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  placeholder?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  name,
  label,
  type,
  placeholder
}) => {
  return (
    <FloatingLabel
      controlId={name}
      label={label}
    >
      <Form.Control
        type={type}
        placeholder={placeholder}
      />
    </FloatingLabel>
  );
}
