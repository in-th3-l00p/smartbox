import React from "react";
import {ABOUT_TITLE} from "../utils/text";
import TextContainer from "../components/TextContainer";

const About = () => {
  return (
    <TextContainer title={ABOUT_TITLE}>
      <p>Într-o lume în care protejarea mediului înconjurător este o prioritate, companiile care se implică în reciclarea selectivă a deșeurilor joacă un rol esențial în reducerea impactului negativ asupra mediului.</p>
      <p>Mems Corporation SRL, prin infopuble.ro, oferă o soluție ecologică și eficientă pentru colectarea selectivă a deșeurilor (menajer, sticlă, carton și plastic), propunăndu-și să transforme gestionarea deșeurilor într-un proces simplu, inteligent și sustenabil, și să contribuie la reducerea cantității de deșeuri care ajung în depozitele de gunoi sau în natură.</p>
      <p>Compania oferă o soluție inteligentă pentru colectarea selectivă a deșeurilor prin containere inteligente, conectate la un website – infopubele.ro – unde fiecare persoană poate să vadă în timp real:</p>
      <ul>
        <li>cantitatea de deșeu aruncată, diferențiat pe categoriile – deșeu menajer - sticlă - carton – plastic</li>
        <li>și poate fi taxată în funcție de căt a aruncat – “Plătești cât arunci”.</li>
      </ul>
      <p>Unul dintre aspectele revoluționare ale serviciului Infopubele.ro este utilizarea containerelor inteligente, echipate cu senzori care monitorizează gradul de umplere și transmit datele în timp real către aplicația web, Infopubele.ro fiind un instrument esențial pentru utilizatorii săi.</p>
      <p>Astfel, <b>fiecare persoană înregistrată</b> are un cont personal în care poate vedea cantitatea de deșeuri aruncate pe categorii (hârtie, plastic, sticlă, deșeuri menajere etc.) și costul asociat fiecărei categorii.</p>
      <p>In același timp, utilizatorii pot monitoriza în timp real impactul lor asupra mediului și pot lua măsuri pentru a reduce cantitatea de deșeuri generate.</p>
      <p><b>Pentru firmele de salubrizare</b> Infopubele.ro oferă o platforma centralizată prin care pot să genereze rapoarte privind locuitorii arondați la un container, lista toturor clienților înregistrați în sistem (cu informații detaliate), locația containerelor, precum și gradul de umplere al fiecărui container și cantitatea de deșeuri aruncate de fiecare persoană.</p>
      <p>Aceste informații sunt esențiale pentru optimizarea rutelor de colectare și gestionarea eficientă a resurselor. În plus, platforma permite firmelor de salubrizare să taxeze fiecare persoană în funcție de cantitatea de deșeuri aruncate, promovând astfel un sistem de "platești cat arunci".</p>
      <p><b>Infopubele.ro reprezintă o soluție inovatoare și eficientă pentru colectarea selectivă a deșeurilor, promovând transparența, responsabilitatea și implicarea fiecărei persoane în protejarea mediului înconjurător.</b></p>
      <p><b>Prin utilizarea tehnologiei și a unei abordări inovatoare, Infopubele.ro își propune să transforme gestionarea deșeurilor într-un proces simplu, inteligent și sustenabil.</b></p>
    </TextContainer>
  );
}

export default About;
