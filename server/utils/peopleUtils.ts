import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE } from '../consts';
import { Person, PeopleResponse } from '../../types/People';
import { peopleImages } from '../data/peopleImages';

interface CacheSettings {
  cacheDate: Date;
  TTL: Date;
}
const DEFAULT_IMAGE_ROOT = '/static/images/main_logo.png';

let peopleCache = {};

let personCache = {};

let CACHE_SETTINGS: CacheSettings = null;

const createCacheSettings = (dateIncrement = 1): CacheSettings => {
  const now = new Date();
  const ttl = new Date();
  ttl.setDate(ttl.getDate() + dateIncrement);

  return {
    cacheDate: now,
    TTL: ttl,
  };
};

const getId = (page: number, pageSize: number = 10) => (index: number): number => {
  const correctedIndex = index + 1;
  if (page === 1) {
    return correctedIndex;
  }
  return (page - 1) * pageSize + correctedIndex;
};

const isCacheValid = (): boolean => CACHE_SETTINGS && CACHE_SETTINGS.TTL < new Date();

const setItemId = (people: Person[], page: number): Person[] =>
  people.map((person: Person, index: number) => {
    const correctedId = getId(page)(index);
    return {
      ...person,
      id: correctedId,
      image_url: peopleImages[correctedId] ? peopleImages[correctedId].image : DEFAULT_IMAGE_ROOT,
    };
  });

export const getPeopleFromCache = async (page: number) => {
  if (peopleCache[page] && isCacheValid()) {
    return peopleCache[page];
  }
  const url = `${API_ROOT}${API_PEOPLE}?page=${page}`;
  const response = await fetch(url);
  const json: PeopleResponse = await response.json();
  const peopleList: PeopleResponse = {
    ...json,
    results: [...setItemId(json.results, page)],
  };
  peopleCache[page] = peopleList;
  const cacheSettings = createCacheSettings();
  CACHE_SETTINGS = cacheSettings;
  return peopleCache[page];
};

export const getPersonFromCache = async id => {
  if (personCache[id] && isCacheValid()) {
    return personCache[id];
  }
  const url = `${API_ROOT}${API_PEOPLE}/${id}`;
  const response = await fetch(url);
  const json: Person = await response.json();
  const person: Person = {
    ...json,
    id,
    image_url: peopleImages[id] ? peopleImages[id].image : DEFAULT_IMAGE_ROOT,
  };

  personCache[id] = person;
  const cacheSettings = createCacheSettings();
  CACHE_SETTINGS = cacheSettings;
  return personCache[id];
};
