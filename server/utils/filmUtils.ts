import fetch from 'node-fetch';
import { API_ROOT, API_FILMS } from '../consts';
import { Film } from '../../types/Film';
import { filmImages } from '../data/filmImages';

const DEFAULT_IMAGE_ROOT = '/static/images/main_logo.png';

let filmCache = [];
let total = 0;

const enhanceFilms = (film: Film[]): Film[] =>
  film.map((film: Film, index: number) => {
    const correctedId = index + 1;
    return {
      ...film,
      id: correctedId,
      image_url: filmImages[correctedId] ? filmImages[correctedId].image : DEFAULT_IMAGE_ROOT,
    };
  });

export const getFilms = async () => {
  if (total !== 0) {
    return filmCache;
  }
  const url = `${API_ROOT}${API_FILMS}`;
  const response = await fetch(url);
  const json = await response.json();

  total = json.count;

  filmCache = enhanceFilms(json.results);
  return filmCache;
};

export const getFilmById = async id => {
  if (total === 0) {
    await getFilms();
  }

  if (filmCache[id]) {
    return filmCache[id];
  }

  return {};
};
