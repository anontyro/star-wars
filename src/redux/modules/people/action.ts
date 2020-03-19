import { ThunkDispatch } from 'redux-thunk';
import {
  SET_PEOPLE_LIST,
  GETTING_PEOPLE_LIST,
  GETTING_PERSON,
  SET_PERSON,
  RESET_PEOPLE,
} from './consts';
import { BACKEND_ROUTES } from '../../../enum/serverRoutes';
import { RootState } from '../..';
import { PeopleResponse, Person } from '../../../../types/People';

interface ResetPeople {
  type: RESET_PEOPLE;
}

interface GettingPeople {
  type: GETTING_PEOPLE_LIST;
}
interface SetPeople {
  type: SET_PEOPLE_LIST;
  payload: PeopleResponse;
}

interface GettingPerson {
  type: GETTING_PERSON;
}

interface SetPerson {
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
  return async (dispatch: ThunkDispatch<unknown, undefined, PeopleActions>, getState) => {
    const state: RootState = getState();
    const expectedItems = page * 10;
    if (state.people.peopleList.length >= expectedItems) {
      return;
    }
    dispatch(gettingPeopleList());

    try {
      const response: any = await fetch(`/${BACKEND_ROUTES.PEOPLE}?page=${page}`, {
        method: 'GET',
      });
      const people: any = await response.json();
      dispatch(setPeopleList(people.response));
    } catch (err) {
      dispatch(resetPeople());
    }
  };
};

export const getPerson = (id: string) => {
  return async (dispatch: ThunkDispatch<unknown, undefined, PeopleActions>, getState) => {
    try {
      dispatch(gettingPerson());
      const state: RootState = getState();
      const listId = parseInt(id) - 1;
      const person = state.people.peopleList[listId];
      if (person) {
        dispatch(setPerson(person));
        return;
      }
      const response: any = await fetch(`/${BACKEND_ROUTES.PEOPLE}/${id}`);
      const json: any = await response.json();
      dispatch(setPerson(json.response));
      return;
    } catch (err) {
      console.error(err);
    }
  };
};
