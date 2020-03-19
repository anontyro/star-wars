import * as filmActions from './action';
import { SET_FILM_LIST } from './consts';
import { BACKEND_ROUTES } from '../../../enum/serverRoutes';

describe('filmActions', () => {
  test('Dispatch the correct actions and payload for getFilmList', async () => {
    const mockResolved = jest.fn().mockResolvedValueOnce({ response: { title: 'A New Hope' } });
    window.fetch = jest.fn().mockResolvedValueOnce({ json: mockResolved });
    const dispatch = jest.fn();
    await filmActions.getFilmList()(dispatch, () => ({
      film: {
        filmList: [],
        currentFilm: null,
        isBusy: false,
      },
    }));
    expect(dispatch).toBeCalledWith({ type: SET_FILM_LIST, payload: { title: 'A New Hope' } });
    expect(window.fetch).toBeCalledWith(`/${BACKEND_ROUTES.FILMS}`);
    expect(mockResolved).toBeCalledTimes(1);
  });
});
