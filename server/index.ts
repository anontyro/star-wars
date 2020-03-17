import * as path from 'path';
import * as express from 'express';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
require('dotenv').config();

class MainServer extends Server {
  reactPath = path.join(__dirname, './index.html');
  staticPath = path.join(__dirname, './static');
  isProduction = process.env.NODE_ENV === 'production';

  private readonly SERVER_START_MSG = 'Main server started on port: ';

  constructor() {
    super(true);
    const { StarWarsPeopleController, StarWarsFilmsController } = controllers;
    const starWarsPeopleController = new StarWarsPeopleController();
    const starWarsFilmsController = new StarWarsFilmsController();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    super.addControllers([starWarsPeopleController, starWarsFilmsController]);
    if (this.isProduction) {
      this.app.use('/static', express.static(this.staticPath));
      this.app.get('*', (req, res) => res.sendFile(this.reactPath));
    }
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_START_MSG + port);
    });
  }
}

export default MainServer;
