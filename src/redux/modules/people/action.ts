import { ThunkDispatch } from 'redux-thunk';
import {
  SET_PEOPLE_LIST,
  GETTING_PEOPLE_LIST,
  GETTING_PERSON,
  SET_PERSON,
  RESET_PEOPLE,
} from './consts';
import { PeopleResponse, Person } from './reducer';
import { BACKEND_ROUTES } from '../../../enum/serverRoutes';

export interface ResetPeople {
  type: RESET_PEOPLE;
}

export interface GettingPeople {
  type: GETTING_PEOPLE_LIST;
}

export interface SetPeople {
  type: SET_PEOPLE_LIST;
  payload: PeopleResponse;
}

export interface GettingPerson {
  type: GETTING_PERSON;
}

export interface SetPerson {
  type: SET_PERSON;
  payload: Person;
}

export type PeopleActions = SetPeople | GettingPeople | GettingPerson | SetPerson | ResetPeople;

const resetPeople = (): ResetPeople => ({
  type: RESET_PEOPLE,
});

const gettingPeopleList = (): GettingPeople => ({
  type: GETTING_PEOPLE_LIST,
});

const setPeopleList = (people: PeopleResponse): SetPeople => ({
  type: SET_PEOPLE_LIST,
  payload: people,
});

const gettingPerson = (): GettingPerson => ({
  type: GETTING_PERSON,
});

const setPerson = (person: Person): SetPerson => ({
  type: SET_PERSON,
  payload: person,
});

export const getPeopleList = (page: number = 1) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, PeopleActions>) => {
    dispatch(gettingPeopleList());

    try {
      const response: any = await fetch(`${BACKEND_ROUTES.PEOPLE}?page=${page}`, {
        method: 'GET',
      });
      const people: any = await response.json();
      dispatch(setPeopleList(people.response));
    } catch (err) {
      dispatch(resetPeople());
    }
  };
};
