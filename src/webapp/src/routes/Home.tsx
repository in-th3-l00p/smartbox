import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import {Carousel, CarouselItem, Container} from "react-bootstrap";
import style from "../styles/Home.module.scss";
import {APPLICATION_NAME, HOME_PAGE_CONTENT, HOME_PAGE_CONTENT_TITLE, HOME_PAGE_SUBTITLE} from "../utils/text";

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
        <p className={style.content}>{HOME_PAGE_CONTENT}</p>
      </Container>
    </div>
  );
}

export default Home;
