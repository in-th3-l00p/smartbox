import React, {useEffect, useState} from "react";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import style from "./../styles/Layout.module.scss";
import {isAuthenticated} from "../api/authenticate";
import {logout} from "../api/authenticate";
import useQuery from "../hooks/useQuery";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, error] = useQuery(async () => {
    setAuthenticated(await isAuthenticated());
  });

  return (
    <Navbar
      expand="lg"
      className={"bg-body-tertiary " + style.navbar}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>SmartBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        {!loading && (
          <Navbar.Collapse id="main-nav">
            {
              authenticated ? ( <>
                <Nav className="me-auto">
                  <Nav.Link href="/">Dashboard</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown title="Profile" id={"profile-dropdown"}>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </> ) : ( <>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </> )
            }
          </Navbar.Collapse>
        )}
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
