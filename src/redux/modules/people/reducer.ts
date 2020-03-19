import {
  GETTING_PEOPLE_LIST,
  SET_PEOPLE_LIST,
  RESET_PEOPLE,
  GETTING_PERSON,
  SET_PERSON,
} from './consts';
import { PeopleActions } from './action';
import { PeopleState } from '../../../../types/People';

export const INITIAL_STATE: PeopleState = {
  peopleList: [],
  currentPerson: null,
  isBusy: false,
};

const people = (state: PeopleState = INITIAL_STATE, action: PeopleActions): PeopleState => {
  switch (action.type) {
    case GETTING_PEOPLE_LIST:
      return {
        ...state,
        isBusy: true,
      };
    case SET_PEOPLE_LIST:
      return {
        ...state,
        peopleList: [...state.peopleList, ...action.payload.results],
        isBusy: false,
      };
    case GETTING_PERSON:
      return {
        ...state,
        isBusy: true,
      };
    case SET_PERSON:
      return {
        ...state,
        currentPerson: action.payload,
        isBusy: false,
      };
    case RESET_PEOPLE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default people;
