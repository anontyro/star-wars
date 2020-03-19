import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../../redux';
import { Person } from '../../../redux/modules/people/reducer';
import * as peopleActions from '../../../redux/modules/people/action';
import Layout from '../../../_layout';
import PageHeader from '../../shared/PageHeader';
import { PersonContainer } from '../../shared/Containers/Containers';

const SinglePersonContainer = styled(PersonContainer)`
  flex: unset;
  width: 300px;
  height: initial;
  height: 420px;
`;

const PersonContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PersonDetailsContainer = styled.div`
  flex: 1;
  margin: 10px;
  padding: 10px;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  min-width: 300px;
  height: 400px;
  overflow-y: auto;
  @media screen and (min-width: 600px) {
    margin-left: 0;
    border-radius: 0 5px 5px 0;
  }
`;

const PersonImage = styled.img`
  margin: auto;
  border-radius: 10px;
  vertical-align: middle;
`;

const ImagePositioner = styled.span`
  position: relative;
  height: 100%;
  display: flex;
  vertical-align: middle;
`;

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  isBusy: boolean;
  person: Person;
}

const PersonPage: React.FC<Props> = ({ person, isBusy, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = match.params;
    if (`${person?.id}` !== id) {
      dispatch(peopleActions.getPerson(id));
    }
  }, [match.params]);

  return (
    <Layout isBusy={isBusy && !person?.name}>
      {person && (
        <React.Fragment>
          <PageHeader previousPage={{ title: 'People', to: '/people' }} title={person.name} />

          <PersonContentContainer>
            <SinglePersonContainer>
              <ImagePositioner>
                <PersonImage src={person?.image_url} />
              </ImagePositioner>
            </SinglePersonContainer>
            <PersonDetailsContainer>
              <p>Birth Year: {person.birth_year}</p>
              <p>Gender: {person.gender}</p>
              <p>Eye Colour: {person.eye_color}</p>
              <p>Hair Colour: {person.hair_color}</p>
              <p>Skin Colour: {person.skin_color}</p>
            </PersonDetailsContainer>
          </PersonContentContainer>
        </React.Fragment>
      )}
    </Layout>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  isBusy: people.isBusy,
  person: people.currentPerson,
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(PersonPage);
