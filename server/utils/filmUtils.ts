import fetch from 'node-fetch';
import { API_ROOT, API_FILMS } from '../consts';
import { Film } from '../../types/Film';
import { filmImages } from '../data/filmImages';

interface CacheSettings {
  cacheDate: Date;
  TTL: Date;
}

const DEFAULT_IMAGE_ROOT = '/static/images/main_logo.png';

let filmCache = [];
let CACHE_SETTINGS: CacheSettings = null;
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

const createCacheSettings = (dateIncrement = 1): CacheSettings => {
  const now = new Date();
  const ttl = new Date();
  ttl.setDate(ttl.getDate() + dateIncrement);

  return {
    cacheDate: now,
    TTL: ttl,
  };
};

export const getFilms = async () => {
  const shouldUseCache = total !== 0 && CACHE_SETTINGS && CACHE_SETTINGS.TTL < new Date();
  if (shouldUseCache) {
    return filmCache;
  }
  const url = `${API_ROOT}${API_FILMS}`;
  const response = await fetch(url);
  const json = await response.json();

  total = json.count;

  filmCache = enhanceFilms(json.results);
  const cacheSettings = createCacheSettings();
  CACHE_SETTINGS = cacheSettings;
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
