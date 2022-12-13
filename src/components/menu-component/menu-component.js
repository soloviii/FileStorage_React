import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { isAuth, isAdminOrSuper, getRole } from '../../services/auth-header'
import { Roles } from '../models/roles'

const MenuComponent = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <Navbar className="toolbar" bg="#1976d2" variant="dark">
      <Container>
        <Navbar.Brand href="/"> Welcome </Navbar.Brand>{' '}
        <Nav className="me-auto">
          {' '}
          {!isAuth() ? <Nav.Link href="/login"> Login </Nav.Link> : null}{' '}
          {isAuth() ? (
            <>
              <Nav.Link href="/"> Home </Nav.Link>{' '}
              <Nav.Link href="/upload"> Upload </Nav.Link>{' '}
              {isAdminOrSuper() ? (
                <>
                  <Nav.Link href="/users"> Users </Nav.Link>{' '}
                </>
              ) : null}{' '}
              <NavDropdown
                title={user.firstName + ' ' + user.lastName}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/user"> My account </NavDropdown.Item>{' '}
              </NavDropdown>{' '}
              <Nav.Link href="/logout"> Logout </Nav.Link>{' '}
            </>
          ) : null}{' '}
        </Nav>{' '}
      </Container>{' '}
    </Navbar>
  )
}
export default MenuComponent
