import React from "react";
import TextContainer from "../components/TextContainer";
import {LabeledInput, LabeledTextArea} from "../components/Forms";
import style from "./../styles/Contact.module.scss";
import {Button} from "react-bootstrap";

const Contact = () => {
  return (
    <TextContainer title={"Contact"}>
      <form className={style.contactForm}>
        <LabeledInput name={"firstName"} label={"Prenume"} type={"text"} className={"mt-3"} />
        <LabeledInput name={"lastName"} label={"Nume"} type={"text"} />
        <LabeledInput name={"email"} label={"Email"} type={"email"} />
        <LabeledInput name={"phone"} label={"Numar de telefon"} type={"text"} />
        <LabeledTextArea name={"message"} label={"Mesaj"} style={{height: "200px"}} />
        <Button className={"mx-auto"}>Trimite</Button>
      </form>
    </TextContainer>
  );
}

export default Contact
