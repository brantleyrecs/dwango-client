/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import Logo from '../public/logo/LOGO.jpg';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src={Logo}
              className="img"
              width={75}
              height={75}
              alt="Dwango Hip Hop, Pizza, & Wings Logo"
            />
          </Navbar.Brand>
        </Link>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/orders">
              <Nav.Link>Orders</Nav.Link>
            </Link>
            <Link passHref href="/orders/new">
              <Nav.Link>Create Order</Nav.Link>
            </Link>
            <button className="button sign" onClick={signOut} type="button">Sign Out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
