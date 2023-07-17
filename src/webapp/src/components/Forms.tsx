import React from "react";
import {FloatingLabel, Form} from "react-bootstrap";

interface LabeledInputProps {
  name: string;
  label: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  name,
  label,
  type,
  placeholder,
  readOnly=false,
  className=""
}) => {
  return (
    <FloatingLabel
      controlId={name}
      label={label}
      className={className}
    >
      <Form.Control
        type={type}
        placeholder={placeholder}
      />
    </FloatingLabel>
  );
}

interface StatefulLabeledInputProps extends LabeledInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const StatefulLabeledInput: React.FC<StatefulLabeledInputProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  setValue,
  readOnly=false,
  className=""
}) => {
  return (
    <FloatingLabel
      controlId={name}
      label={label}
      className={className}
    >
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (setValue !== undefined)
            setValue(e.target.value || "");
        }}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );
}
