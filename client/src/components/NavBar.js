import React, {useContext} from 'react';
import { Context } from '../index';

import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { CRM_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import { useHistory } from 'react-router-dom';

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const history = useHistory()

  const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
  }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <NavLink style={{color: 'white'}} to={HOME_ROUTE}>Home</NavLink>
            {user.isAuth ?
              <Nav className="ms-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => history.push(CRM_ROUTE)}>CRM панель</Button>
                <Button variant={"outline-light"} className="ms-2" onClick={() => {logOut(); history.push(HOME_ROUTE) }}>Выйти</Button>
              </Nav>
              :
              <Nav className="ms-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)} >Авторизация</Button>
              </Nav>
            }
          </Container>
        </Navbar>
    );
});

export default NavBar;