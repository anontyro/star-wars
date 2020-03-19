import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Person } from '../../../redux/modules/people/reducer';
import { PersonContainer } from './Containers';

const PersonCardImage = styled.img`
  height: 200px;
  margin: auto;
`;

const PersonCardBody = styled.div``;

const PersonBackground = styled.div`
  content: '';
  background-color: black;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

interface PersonProps {
  person: Person;
  children?: React.ReactChild;
}

const PersonCard: React.FC<PersonProps> = ({ person, children }) => (
  <Link to={`/people/${person?.id}`}>
    <PersonContainer>
      <PersonCardImage src={person.image_url} />
      <PersonCardBody>{children ? children : <h3>{person.name}</h3>}</PersonCardBody>
    </PersonContainer>
  </Link>
);

export default PersonCard;
