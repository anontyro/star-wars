import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE } from '../consts';

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

const getPeopleFromCache = async (page: number) => {
  if (peopleCache[page]) {
    return peopleCache[page];
  }
  const url = `${API_ROOT}${API_PEOPLE}?page=${page}`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  peopleCache[page] = json;
  return json;
};

const getPersonFromCache = async id => {
  if (personCache[id]) {
    return peopleCache[id];
  }
  const url = `${API_ROOT}${API_PEOPLE}/${id}`;
  const response = await fetch(url);
  const json = await response.json();

  peopleCache[id] = json;
  return json;
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
