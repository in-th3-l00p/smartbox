import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import {Carousel, CarouselItem, Container} from "react-bootstrap";
import style from "../styles/Home.module.scss";
import {APPLICATION_NAME, HOME_PAGE_CONTENT_TITLE, HOME_PAGE_SUBTITLE} from "../utils/text";
import GeneratorDashboard from "../components/GeneratorDashboard";
import DeviceMap from "../components/Map";

const Home = () => {
  const auth = useContext(AuthContext);
  const carouselImages = [
    "/homeCarousel/first.jpg",
    "/homeCarousel/second.jpg",
    "/homeCarousel/third.jpg",
    "/homeCarousel/forth.jpg",
    "/homeCarousel/fifth.jpg"
  ]

  if (auth.isAuthenticated && auth.userDetails.authorities.includes("ROLE_ADMIN"))
    return <AdminDashboard />
  else if (auth.isAuthenticated && auth.userDetails.authorities.includes("ROLE_GENERATOR"))
    return <GeneratorDashboard />
  else if (auth.isAuthenticated && auth.userDetails.authorities.includes("ROLE_USER"))
    return <UserDashboard />
  return (
    <div className={style.homeContent}>
      <Carousel className={style.carousel}>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <img className={style.carouselImage} src={image} alt={image} />
          </CarouselItem>
        ))}
      </Carousel>
      <div className={style.carouselCaption}>
        <h1>{APPLICATION_NAME}</h1>
        <h3>{HOME_PAGE_SUBTITLE}</h3>
      </div>

      <Container className={style.textContainer}>
        <h2 className={style.title}>{HOME_PAGE_CONTENT_TITLE}</h2>
        <div className={style.content}>
          <p>Reciclarea este un proces esențial pentru protejarea mediului înconjurător și pentru conservarea resurselor naturale. Este o practică prin care materialele utilizate sunt colectate, sortate, prelucrate și transformate în noi produse sau materii prime, în loc să fie aruncate la groapa de gunoi sau incinerate.</p>
          <p>Importanța reciclării este una crucială în lupta împotriva poluării și schimbărilor climatice.</p>
          <p>Iată câteva motive pentru care reciclarea este atât de importantă:</p>
          <ol>
            <li>Protejarea mediului: Reciclarea reduce cantitatea de deșeuri care ajung în depozitele de gunoi sau în natură. Deșeurile care nu sunt reciclate pot polua solul, apa și aerul, având un impact negativ asupra ecosistemelor și biodiversității.</li>
            <li>Economisirea resurselor naturale: Reciclarea reduce dependența de materii prime noi, cum ar fi lemnul, petrolul sau mineralele. Prin reciclare, putem extrage și utiliza materialele deja existente într-un ciclu continuu, evitând epuizarea resurselor naturale limitate ale Pământului.</li>
            <li>Reducerea emisiilor de gaze cu efect de seră: Producerea de noi produse din materiale reciclate necesită mai puțină energie decât producția din materii prime noi. Astfel, reciclarea contribuie la reducerea emisiilor de gaze cu efect de seră și la combaterea schimbărilor climatice.</li>
            <li>Economisirea energiei: Procesul de reciclare necesită, în general, mai puțină energie decât producția de materiale noi. De exemplu, reciclarea hârtiei poate economisi până la 60% din energia necesară pentru fabricarea hârtiei noi.</li>
            <li>Crearea de locuri de muncă și stimularea economiei circulare: Industria reciclării oferă oportunități de angajare și contribuie la dezvoltarea unei economii circulare, în care resursele sunt utilizate în mod eficient și durabil.</li>
          </ol>
          <p>Pentru a maximiza beneficiile reciclării, este important să fim conștienți de impactul pe care îl avem asupra mediului și să adoptăm obiceiuri de consum responsabile. Sortarea corectă a deșeurilor și reciclarea lor în mod regulat sunt pași simpli pe care îi putem face pentru a contribui la protejarea mediului și la crearea unui viitor mai sustenabil.</p>
          <p><b>Infopubele.ro</b> reprezintă o soluție inovatoare și eficientă pentru colectarea selectivă a deșeurilor, promovând transparența, responsabilitatea și implicarea fiecărei persoane în protejarea mediului înconjurător.</p>
          <p><b>Prin utilizarea tehnologiei și a unei abordări inovatoare, Infopubele.ro își propune să transforme gestionarea deșeurilor într-un proces simplu, inteligent și sustenabil.</b></p>
        </div>
      </Container>

      <Container className={style.textContainer}>
        <h2 className={style.title}>Locația pubelelor</h2>
        <DeviceMap />
      </Container>
    </div>
  );
}

export default Home;
