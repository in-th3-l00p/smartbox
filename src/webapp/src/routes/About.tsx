import React from "react";
import {ABOUT_TEXT, ABOUT_TITLE} from "../utils/text";
import TextContainer from "../components/TextContainer";

const About = () => {
  return (
    <TextContainer title={ABOUT_TITLE}>
      <p>{ABOUT_TEXT}</p>
    </TextContainer>
  );
}

export default About;
