import { FilmState, FilmActions } from './action';
import { GETTING_FILM_LIST, SET_FILM_LIST } from './consts';
import { Person } from '../../../../types/People';
import { Film } from '../../../../types/Film';

const INITIAL_STATE: FilmState = {
  filmList: [],
  currentFilm: null,
  isBusy: false,
};

const film = (state: FilmState = INITIAL_STATE, action: FilmActions): FilmState => {
  switch (action.type) {
    case GETTING_FILM_LIST:
      return {
        ...state,
        isBusy: true,
      };
    case SET_FILM_LIST:
      return {
        ...state,
        filmList: action.payload,
        isBusy: false,
      };

    default:
      return state;
  }
};

export const mapFilmsToCharacter = (person: Person, filmState: FilmState) => {
  const filmList: Film[] = filmState?.filmList;
  if (filmList.length === 0 || !person?.films) {
    return person;
  }
  const films = person.films.map((item: string) => {
    const filmId: number = parseInt(item.charAt(item.length - 2)) - 1;
    return {
      image_url: filmList[filmId]?.image_url,
      title: filmList[filmId]?.title,
    };
  });
  person.film_list = films;
  return {
    ...person,
    film_list: films,
  };
};

export default film;
