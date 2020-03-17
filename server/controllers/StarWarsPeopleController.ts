import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE } from '../consts';

let peopleCache = {};

const getFromCache = async (page: number) => {
  console.log(peopleCache);
  if (peopleCache[page]) {
    return peopleCache[page];
  }
  const url = `${API_ROOT}${API_PEOPLE}?page=${page}`;
  const response = await fetch(url);
  const json = await response.json();

  peopleCache[page] = json;
  return json;
};

@Controller('api/starwars/people')
class StarWarsPeopleController {
  @Get('')
  private async people(req: Request, res: Response) {
    try {
      const { page = 1 } = req.query;
      // const url = `${API_ROOT}${API_PEOPLE}?page=${page}`;
      // const response = await fetch(url);
      // const json = await response.json();
      const response = await getFromCache(page);
      return res.status(OK).json({
        body: response,
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
