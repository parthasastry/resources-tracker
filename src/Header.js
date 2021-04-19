import React from "react";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><i class="fas fa-users"></i> Resource Tracker</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/" className="text-white">
            <Nav.Link>Allocations</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/rr" className="text-white">
            <Nav.Link>Opportunities</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/availability" className="text-white">
            <Nav.Link>Availability</Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;