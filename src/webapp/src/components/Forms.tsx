import React from "react";
import {FloatingLabel, Form} from "react-bootstrap";

interface LabeledInputProps {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  readOnly?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  setValue,
  readOnly=false
}) => {
  if (value && setValue)
    return (
      <FloatingLabel
        controlId={name}
        label={label}
      >
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={readOnly}
        />
      </FloatingLabel>
    );
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
