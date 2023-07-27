import React, {useContext} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import style from "./../styles/Layout.module.scss";
import {logout} from "../api/authenticate";
import AuthContext from "../context/AuthContext";
import {
  APPLICATION_NAME,
  FOOTER_ANPC,
  FOOTER_BUSINESS_INFOMRATION,
  FOOTER_COOKIES_POLICY,
  FOOTER_PRIVACY_POLICY,
  FOOTER_TERMS_AND_CONDITIONS,
  HEADER_ABOUT_US,
  HEADER_CONTACT,
  HEADER_DASHBOARD,
  HEADER_HOME,
  HEADER_LOGIN,
  HEADER_LOGOUT,
  HEADER_PROFILE,
  HEADER_REGISTER
} from "../utils/text";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <Navbar
      expand="lg"
      className={"bg-body-tertiary " + style.navbar}
      // data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>
          <img
            src={"/logo.png"}
            alt={"logo"}
            style={{
              width: "40px",
              marginRight: "10px"
            }}
          />
          {APPLICATION_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {
            auth.isAuthenticated ? ( <>
              <Nav className="me-auto">
                <Nav.Link href="/">{HEADER_DASHBOARD}</Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown title={auth.userDetails.login} id={"profile-dropdown"}>
                  <NavDropdown.Item href="/profile">{HEADER_PROFILE}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>{HEADER_LOGOUT}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </> ) : ( <>
              <Nav className="me-auto">
                <Nav.Link href="/">{HEADER_HOME}</Nav.Link>
                <Nav.Link href="/about">{HEADER_ABOUT_US}</Nav.Link>
                <Nav.Link href="/contact">{HEADER_CONTACT}</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">{HEADER_LOGIN}</Nav.Link>
                <Nav.Link href="/register">{HEADER_REGISTER}</Nav.Link>
              </Nav>
            </> )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const Footer = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={style.footer}>
      <Container className="text-center py-4">
        <p className={style.info}>{FOOTER_BUSINESS_INFOMRATION}</p>
        <span className={style.line} />
        {auth.isAuthenticated && (
          <>
            <a href={"/profile"} className={style.account}>Contul meu</a>
            <span className={style.line} />
          </>
          )}
        <ul className={style.links}>
          <li><a href={"#"}>{FOOTER_ANPC}</a></li>
          <li><a href={"#"}>{FOOTER_TERMS_AND_CONDITIONS}</a></li>
          <li><a href={"#"}>{FOOTER_PRIVACY_POLICY}</a></li>
          <li><a href={"#"}>{FOOTER_COOKIES_POLICY}</a></li>
        </ul>
        <span className={style.line} />
        <span className={style.socials}>
          <a href={"#"}><img src={"/socialIcons/facebook.png"} alt={"facebook"} /></a>
          <a href={"#"}><img src={"/socialIcons/instagram.png"} alt={"instagram"} /></a>
        </span>
      </Container>
    </div>
  );
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
    <div>
      <div style={{minHeight: "100vh"}}>
        <Header />
        <main className={style.mainContainer}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
	)
}

export default Layout;
