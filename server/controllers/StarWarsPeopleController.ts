import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE } from '../consts';
import { Person, PeopleResponse } from '../../types/People';
import { peopleImages } from '../data/peopleImages';

const DEFAULT_IMAGE_ROOT = '/static/images/main_logo.png';

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
  peopleCache[page] = peopleList;
  return peopleCache[page];
};

const getPersonFromCache = async id => {
  if (personCache[id]) {
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
