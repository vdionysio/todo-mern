import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

function Header({ displayName }) {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  const logOut = useCallback(() => {
    setToken();
    navigate('/');
  }, []);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Todo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Navbar.Text>{displayName}</Navbar.Text>
        </Navbar.Collapse>
        <Button variant="primary" onClick={logOut} size="sm">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string
};

export default Header;
