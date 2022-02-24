import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import { Button, Container, Navbar } from 'react-bootstrap';

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
        <Navbar.Brand>To Do List</Navbar.Brand>
        <Navbar.Text>{displayName}</Navbar.Text>
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
