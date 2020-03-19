import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { RootState } from '../../../redux';
import * as peopleActions from '../../../redux/modules/people/action';
import * as filmActions from '../../../redux/modules/films/action';
import Layout from '../../../_layout';
import PageHeader from '../../shared/PageHeader';
import { PageCentreColumnContainer, MainBodyContainer } from '../../shared/Containers/Containers';
import { Person } from '../../../../types/People';
import { Film } from '../../../../types/Film';
import { FilmContainer, PosterImage } from '../../shared/Containers/FilmContainer';

interface Props {
  peopleList: Person[];
  filmList: Film[];
  isBusy: boolean;
}

const HomePage: React.FC<Props> = ({ peopleList, filmList, isBusy }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peopleActions.getPeopleList());
    dispatch(filmActions.getFilmList());
  }, [dispatch]);

  return (
    <Layout isBusy={isBusy}>
      <React.Fragment>
        <PageHeader title={'Home'} />
        <PageCentreColumnContainer>
          <MainBodyContainer>
            <p>
              Welcome to my Star Wars API site that takes the standard SWAPI and enhances it to
              produce a bit more customization along with hopefully a much better user experiance as
              well
            </p>
          </MainBodyContainer>
          <MainBodyContainer>
            <FilmContainer>
              {filmList.map((film: Film) => {
                return <PosterImage key={film?.image_url} src={film?.image_url} />;
              })}
            </FilmContainer>
          </MainBodyContainer>
        </PageCentreColumnContainer>
      </React.Fragment>
    </Layout>
  );
};

const mapStateToProps = ({ people, film }: RootState) => ({
  peopleList: people.peopleList,
  filmList: film.filmList,
  isBusy: people.isBusy,
});

const enhance = connect(mapStateToProps);

export default enhance(HomePage);
