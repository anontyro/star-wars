import * as peopleActions from './action';
import { SET_PEOPLE_LIST, SET_PERSON } from './consts';
import { BACKEND_ROUTES } from '../../../enum/serverRoutes';

describe('peopleActions.', () => {
  test('Dispatch the correct actions and payload for getPeopleList', async () => {
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: { name: 'Skywalker' } });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await peopleActions.getPeopleList()(dispatch, () => ({
      people: {
        peopleList: [],
        currentPerson: null,
        isBusy: false,
      },
    }));
    expect(dispatch).toBeCalledWith({ type: SET_PEOPLE_LIST, payload: { name: 'Skywalker' } });
    expect(window.fetch).toBeCalledWith(`/${BACKEND_ROUTES.PEOPLE}?page=1`);
    expect(mockResolved).toBeCalledTimes(1);
  });

  test('Dispatch the correct actions and payload for getPerson', async () => {
    const id = '1';
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: { name: 'Skywalker' } });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await peopleActions.getPerson(id)(dispatch, () => ({
      people: {
        peopleList: [],
        currentPerson: null,
        isBusy: false,
      },
    }));
    expect(dispatch).toBeCalledWith({ type: SET_PERSON, payload: { name: 'Skywalker' } });
    expect(window.fetch).toBeCalledWith(`/${BACKEND_ROUTES.PEOPLE}/${id}`);
    expect(mockResolved).toBeCalledTimes(1);
  });
});
