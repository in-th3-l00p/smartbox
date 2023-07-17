import React, {useContext, useEffect} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import style from "./../styles/Layout.module.scss";
import {logout} from "../api/authenticate";
import AuthContext from "../context/AuthContext";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Header = () => {
  const auth = useContext(AuthContext);
  useEffect(() => console.log(auth), []);

  return (
    <Navbar
      expand="lg"
      className={"bg-body-tertiary " + style.navbar}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>SmartBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {
            auth.isAuthenticated ? ( <>
              <Nav className="me-auto">
                <Nav.Link href="/">Dashboard</Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown title="Profil" id={"profile-dropdown"}>
                  <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Delogare</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </> ) : ( <>
              <Nav className="me-auto">
                <Nav.Link href="/">Acasă</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Logare</Nav.Link>
                <Nav.Link href="/register">Înregistrare</Nav.Link>
              </Nav>
            </> )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
    <div>
      <Header />
      <main className={style.mainContainer}>
        {children}
      </main>
    </div>
	)
}

export default Layout;
