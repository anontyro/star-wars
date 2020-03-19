import { Film } from '../../../../types/Film';
import { GETTING_FILM_LIST, SET_FILM_LIST } from './consts';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { BACKEND_ROUTES } from '../../../enum/serverRoutes';

export interface FilmState {
  filmList: Film[];
  currentFilm: Film | null;
  isBusy: boolean;
}

interface GettingFilms {
  type: GETTING_FILM_LIST;
}

interface SetFilms {
  type: SET_FILM_LIST;
  payload: Film[];
}

export type FilmActions = GettingFilms | SetFilms;

const gettingFilms = (): GettingFilms => ({
  type: GETTING_FILM_LIST,
});

const setFilms = (films: Film[]): SetFilms => ({
  type: SET_FILM_LIST,
  payload: films,
});

export const getFilmList = () => {
  return async (dispatch: ThunkDispatch<unknown, undefined, FilmActions>, getState) => {
    const state: RootState = getState();

    if (state.film.filmList.length > 0) {
      return;
    }
    dispatch(gettingFilms());
    try {
      const response: any = await fetch(`/${BACKEND_ROUTES.FILMS}`);
      const json: { response: Film[] } = await response.json();
      dispatch(setFilms(json.response));
    } catch (err) {
      console.error(err);
    }
  };
};
