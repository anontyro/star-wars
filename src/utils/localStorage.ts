import { RootStateOrAny } from 'react-redux';
import { RootState } from '../redux';
import { INITIAL_STATE as peopleState } from '../redux/modules/people/reducer';
import { INITIAL_STATE as filmState } from '../redux/modules/films/reducer';

const APP_STATE: RootState = {
  people: peopleState,
  film: filmState,
};

const STAR_STATE_LOCAL = 'STAR_STATE_LOCAL';
const STAR_TTL = 'STAR_TTL';

export const loadState = (): RootState => {
  try {
    const serilizeState = localStorage.getItem(STAR_STATE_LOCAL);
    const currentDate = new Date();
    const serilizeTTL = localStorage.getItem(STAR_TTL);
    if (!serilizeState || !serilizeTTL) {
      return APP_STATE;
    }
    const ttl = new Date(serilizeTTL);
    const isCacheExpired = currentDate.getUTCDate() > ttl.getUTCDate();
    return isCacheExpired ? APP_STATE : JSON.parse(serilizeState);
  } catch (err) {
    return APP_STATE;
  }
};

export const saveState = (state: RootStateOrAny): void => {
  try {
    const serilizeState = JSON.stringify(state);
    localStorage.setItem(STAR_STATE_LOCAL, serilizeState);
    localStorage.setItem(STAR_TTL, `${new Date()}`);
  } catch (err) {
    console.error('Unable to save current state in local storage', err);
  }
};
