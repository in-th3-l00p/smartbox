import React from "react";
import {Container} from "react-bootstrap";
import style from "../styles/TextContainer.module.scss";

interface TextContainerProps {
  title: string;
  children: string | JSX.Element | JSX.Element[];
}

const TextContainer: React.FC<TextContainerProps> = ({ title, children }) => {
  return (
    <Container className={style.textContainer}>
      <h2 className={style.title}>{title}</h2>
      {children}
    </Container>
  );
}

export default TextContainer;
