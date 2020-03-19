import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../../redux';
import * as peopleActions from '../../../redux/modules/people/action';
import * as filmActions from '../../../redux/modules/films/action';

import Layout from '../../../_layout';
import PageHeader from '../../shared/PageHeader';
import {
  PersonContainer,
  PageCentreRowContainer,
  MainBodyContainer,
} from '../../shared/Containers/Containers';
import { Person, PersonFilmType } from '../../../../types/People';
import { mapFilmsToCharacter } from '../../../redux/modules/films/reducer';
import { FilmContainer, PosterImage } from '../../shared/Containers/FilmContainer';

const SinglePersonContainer = styled(PersonContainer)`
  flex: unset;
  width: 300px;
  height: initial;
  height: 420px;
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

const PersonDetailsContainer = styled(MainBodyContainer)`
  @media screen and (min-width: 600px) {
    margin-left: 0;
    border-radius: 0 5px 5px 0;
  }
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
    window.scrollTo(0, 0);
    const { id } = match.params;
    if (`${person?.id}` !== id) {
      dispatch(peopleActions.getPerson(id));
      dispatch(filmActions.getFilmList());
    }
  }, [match.params]);

  return (
    <Layout isBusy={isBusy && !person?.name}>
      {person && (
        <React.Fragment>
          <PageHeader previousPage={{ title: 'People', to: '/people' }} title={person.name} />

          <PageCentreRowContainer>
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
          </PageCentreRowContainer>
          {person.film_list && (
            <PageCentreRowContainer>
              <MainBodyContainer>
                <PageHeader title={'Filmography'} />
                <FilmContainer>
                  {person.film_list.map((film: PersonFilmType) => {
                    return <PosterImage key={film.image_url} src={film?.image_url} />;
                  })}
                </FilmContainer>
              </MainBodyContainer>
            </PageCentreRowContainer>
          )}
        </React.Fragment>
      )}
    </Layout>
  );
};

const mapStateToProps = ({ people, film }: RootState) => ({
  isBusy: people.isBusy,
  person: mapFilmsToCharacter(people.currentPerson, film),
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(PersonPage);
