import styled from 'styled-components';
import Link from 'next/link';

const Nav = styled.nav`
  height: 80px;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const StyledLink = styled.a`
  padding: 0rem 2rem;
`;

const Navbar = () => {
  return (
    <Nav>
      <div>
        <Link href='/' passHref>
          <StyledLink>Courses</StyledLink>
        </Link>
        <Link href='/' passHref>
          <StyledLink>Events</StyledLink>
        </Link>
        <Link href='/' passHref>
          <StyledLink>Home</StyledLink>
        </Link>
        <Link href='/' passHref>
          <StyledLink>Students</StyledLink>
        </Link>
        <Link href='/' passHref>
          <StyledLink>Teachers</StyledLink>
        </Link>
      </div>
      <div>
        <Link href='/login' passHref>
          <StyledLink>Login</StyledLink>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;
