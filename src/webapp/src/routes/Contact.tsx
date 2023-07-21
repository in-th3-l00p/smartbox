import React, {useState} from "react";
import TextContainer from "../components/TextContainer";
import {LabeledInput, LabeledTextArea} from "../components/Forms";
import style from "./../styles/Contact.module.scss";
import {Alert, Button} from "react-bootstrap";
import {sendContact} from "../api/contact";

const Contact = () => {
  const [error, setError] = useState<Error>();

  return (
    <TextContainer title={"Contact"}>
      <form className={style.contactForm} onSubmit={(e) => {
        e.preventDefault();
        const data = {
          firstName: (e.target as any).firstName.value,
          lastName: (e.target as any).lastName.value,
          email: (e.target as any).email.value,
          phone: (e.target as any).phone.value,
          message: (e.target as any).message.value,
        };
        if (
          data.firstName === "" ||
          data.lastName === "" ||
          data.email === "" ||
          data.phone === "" ||
          data.message === ""
        ) {
          setError(new Error("Toate campurile sunt obligatorii!"));
          return;
        }
        sendContact(data)
          // .then(() => window.location.href = "/contact?success")
          .catch(e => setError(e));
      }}>
        {error !== undefined && (
          <Alert
            variant={"danger"}
            onClose={() => setError(undefined)}
            dismissible
          >
            {error.message}
          </Alert>
        )}
        <LabeledInput name={"firstName"} label={"Prenume"} type={"text"} className={"mt-3"} />
        <LabeledInput name={"lastName"} label={"Nume"} type={"text"} />
        <LabeledInput name={"email"} label={"Email"} type={"email"} />
        <LabeledInput name={"phone"} label={"Numar de telefon"} type={"text"} />
        <LabeledTextArea name={"message"} label={"Mesaj"} style={{height: "200px"}} />
        <Button type={"submit"} className={"mx-auto"}>Trimite</Button>
      </form>
    </TextContainer>
  );
}

export default Contact
