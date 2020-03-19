import { combineReducers } from 'redux';
import people from './modules/people/reducer';
import film from './modules/films/reducer';

const rootReducer = combineReducers({
  people,
  film,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
