import React from 'react';
import styled from 'styled-components';

const PageHeaderContainer = styled.div`
  margin: 20px;
  margin-top: 0;
  font-size: 1.5em;
  font-weight: 600;
`;

const Header = styled.h1``;

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = ({ title }) => (
  <PageHeaderContainer>
    <Header>{title}</Header>
  </PageHeaderContainer>
);

export default PageHeader;
