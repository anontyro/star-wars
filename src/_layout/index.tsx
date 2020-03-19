import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { faLinkedin, faGithubSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import SearchBar from './components/SearchBar';
import Loading from '../components/shared/Loading';
import { CenterDiv } from '../components/shared/Containers/Containers';
import COLOURS from '../enum/colours';
import SocialLink, { SocialContainer, externalLink } from '../components/SocialIcon';

const LOGO_IMG_URL = '/static/images/star_wars_logo.png';

interface NavLinkProps {
  isActive?: boolean;
}

const NavLink = styled(({ isActive, ...rest }) => <Link {...rest} />)<NavLinkProps>`
  padding: 0 10px;
  cursor: ${(props: NavLinkProps) => (props.isActive ? 'unset' : 'pointer')};
  ${(props: NavLinkProps) => (props.isActive ? `color: ${COLOURS.MAIN_GOLD}` : '')};
  :hover {
    color: ${COLOURS.MAIN_GOLD};
  }
`;

const ExternalLink = styled.div`
  cursor: pointer;
  :hover {
    color: ${COLOURS.MAIN_GOLD};
  }
`;

const MainNav = styled.div`
  height: 180px;
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  color: white;
  padding: 20px;
  @media screen and (min-width: 600px) {
    height: 130px;
    flex-direction: row;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LogoImg = styled.img`
  width: 150px;
  margin: auto;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MainContentBackground = styled.div`
  background-image: url('/static/images/backgrounds/star_wars_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  content: ' ';
  height: 100%;
  padding: 25px 0;
`;

const PageContent = styled.div`
  position: relative;
  top: 0;
  width: 100%;
`;

const MainFooter = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  children: React.ReactChild;
  isBusy?: boolean;
}

const Layout: React.FC<Props> = ({ children, isBusy = false }) => {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <MainNav>
        <SearchBar />
        <LogoImg src={LOGO_IMG_URL} />
        <NavMenu>
          <NavLink isActive={pathname === '/'} to="/">
            Home
          </NavLink>
          <NavLink isActive={pathname === '/people'} to="/people">
            People
          </NavLink>
        </NavMenu>
      </MainNav>
      <ContentContainer className="content">
        <MainContentBackground>
          {isBusy ? (
            <CenterDiv>
              <Loading />
            </CenterDiv>
          ) : (
            <PageContent>{children}</PageContent>
          )}
        </MainContentBackground>
      </ContentContainer>

      <MainFooter className="footer">
        <FooterContainer>
          <SocialContainer>
            <SocialLink icon={faGithubSquare} url={'https://github.com/anontyro/star-wars'} />
            <SocialLink icon={faLinkedin} url={'https://www.linkedin.com/in/wilkinsonalexander/'} />
            <SocialLink icon={faFacebookSquare} url={'https://www.facebook.com/AWILKINSON.SG'} />
          </SocialContainer>
          <ExternalLink onClick={() => externalLink('https://alexwilkinson.co')}>
            Alexander Wilkinson
          </ExternalLink>
        </FooterContainer>
      </MainFooter>
    </React.Fragment>
  );
};

export default Layout;
