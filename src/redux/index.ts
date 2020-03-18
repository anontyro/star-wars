import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import people from './modules/people/reducer';

const rootReducer = combineReducers({
  user,
  people,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
