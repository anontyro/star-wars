import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE } from '../consts';

interface PeopleResponse {
  count: number;
  next: string;
  previous: number;
  results: Person[];
}

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
  image_url?: string;
  id?: number;
}

const DEFAULT_IMAGE_ROOT = '/static/images/main_logo.png';
const PEOPLE_IMAGE_ROOT = '/static/images/people/';

const peopleImages = {
  1: {
    name: 'Luke Skywalker',
    image: `${PEOPLE_IMAGE_ROOT}luke_skywalker_main_01.png`,
  },
  2: {
    name: 'C-3PO',
    image: `${PEOPLE_IMAGE_ROOT}c_3po_main_02.png`,
  },
};

let peopleCache = {};

let personCache = {};

const getId = (page: number, pageSize: number = 10) => (index: number): number => {
  const correctedIndex = index + 1;
  if (page === 1) {
    return correctedIndex;
  }
  return (page - 1) * pageSize + correctedIndex;
};

const setItemId = (people: Person[], page: number): Person[] =>
  people.map((person: Person, index: number) => {
    const correctedId = getId(page)(index);
    return {
      ...person,
      id: correctedId,
      image_url: peopleImages[correctedId] ? peopleImages[correctedId].image : DEFAULT_IMAGE_ROOT,
    };
  });

const getPeopleFromCache = async (page: number) => {
  if (peopleCache[page]) {
    return peopleCache[page];
  }
  const url = `${API_ROOT}${API_PEOPLE}?page=${page}`;
  const response = await fetch(url);
  const json: PeopleResponse = await response.json();
  const peopleList: PeopleResponse = {
    ...json,
    results: [...setItemId(json.results, page)],
  };
  console.log(peopleList);
  peopleCache[page] = peopleList;
  return peopleCache[page];
};

const getPersonFromCache = async id => {
  if (personCache[id]) {
    return peopleCache[id];
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
  return personCache[id];
};

@Controller('api/starwars/people')
class StarWarsPeopleController {
  @Get('')
  private async people(req: Request, res: Response) {
    try {
      const { page = 1 } = req.query;
      const response = await getPeopleFromCache(page);
      return res.status(OK).json({
        response,
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
  @Get(':id')
  private async person(req: Request, res: Response) {
    try {
      const { id = 1 } = req.params;
      const response = await getPersonFromCache(id);
      return res.status(OK).json({
        response,
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}

export default StarWarsPeopleController;
