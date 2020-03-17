import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { API_ROOT, API_PEOPLE, API_FILMS } from '../consts';

let filmCache = [];
let total = 0;

const getFilms = async () => {
  if (total !== 0) {
    return filmCache;
  }
  const url = `${API_ROOT}${API_FILMS}`;
  const response = await fetch(url);
  const json = await response.json();

  total = json.count;

  filmCache = json.results;
  return filmCache;
};

const getFilmById = async id => {
  if (total === 0) {
    await getFilms();
  }

  if (filmCache[id]) {
    return filmCache[id];
  }

  return {};
};

@Controller('api/starwars/films')
class StarWarsFilmsController {
  @Get('')
  private async people(req: Request, res: Response) {
    try {
      const response = await getFilms();
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
      const response = await getFilmById(id);
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

export default StarWarsFilmsController;
