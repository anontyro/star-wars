import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';

const LOGO_IMG_URL = '/static/images/star_wars_logo.png';

const NavLink = styled(Link)`
  cursor: pointer;
  :hover {
    color: #e7d51d;
  }
`;

const MainNav = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 20px;
`;

const NavMenu = styled.div`
  display: flex;
  width: 10vw;
  justify-content: space-around;
`;

const LogoImg = styled.img`
  width: 150px;
`;

const MainContent = styled.div`
  background-image: url('/static/images/backgrounds/star_wars_bg_rise.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(30px) opacity(0.5);
`;

const MainFooter = styled.div`
  background-color: black;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  children: React.ReactChild;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <MainNav>
        <SearchBar />
        <LogoImg src={LOGO_IMG_URL} width="auto" />
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/people">People</NavLink>
        </NavMenu>
      </MainNav>
      <MainContent className="content">{children}</MainContent>

      <MainFooter className="footer">test footer</MainFooter>
    </React.Fragment>
  );
};

export default Layout;
