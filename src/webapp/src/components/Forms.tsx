import React from "react";
import {Form} from "react-bootstrap";

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
  className=""
}) => {
  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

interface StatefulLabeledInputProps extends LabeledInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
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
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (setValue !== undefined)
            setValue(e.target.value);
        }}
        readOnly={readOnly}
      />
    </Form.Group>
  );
}

interface LabeledTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LabeledTextArea: React.FC<LabeledTextAreaProps> = ({
  name,
  label,
  placeholder,
  readOnly=false,
  className="",
  style={}
}) => {
  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        as={"textarea"}
        placeholder={placeholder}
        readOnly={readOnly}
        style={style}
      />
    </Form.Group>
  );
}
