import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import COLOURS from '../../enum/colours';

const HeaderLink = styled(Link)`
  :hover {
    color: ${COLOURS.MAIN_GOLD};
  }
`;

const Spacer = styled.span`
  margin: 0 10px;
  flex: 0;
`;

const PageHeaderContainer = styled.div`
  display: flex;
  margin: 20px;
  margin-top: 0;
  font-size: 1.5em;
  font-weight: 600;
`;

const Header = styled.h1``;

interface Props {
  title: string;
  previousPage?: {
    title: string;
    to: string;
  };
}

const PageHeader: React.FC<Props> = ({ title, previousPage }) => (
  <PageHeaderContainer>
    {previousPage && (
      <React.Fragment>
        <HeaderLink to={previousPage.to}>{previousPage.title}</HeaderLink> <Spacer>></Spacer>
      </React.Fragment>
    )}
    <Header>{title}</Header>
  </PageHeaderContainer>
);

export default PageHeader;
