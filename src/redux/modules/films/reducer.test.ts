import { mapFilmsToCharacter } from './reducer';
import { MOCK_LUKE } from '../../../mocks/mockPeople';
import { MOCK_FILM_STATE } from '../../../mocks/mockStates';
import { Person } from '../../../../types/People';
import { FilmState } from './action';
import { MOCK_NEW_HOPE } from '../../../mocks/mockFilms';

describe('film selector', () => {
  test('mapFilmsToCharacter will return an unmutated person when no filmList is present', () => {
    const mockPerson = { ...MOCK_LUKE };
    const mockState = { ...MOCK_FILM_STATE };

    const output = mapFilmsToCharacter(mockPerson, mockState);
    expect(output).toEqual(mockPerson);
  });

  test('mapFilmsToCharacter will return an musted person when filmList is present', () => {
    const mockPerson: Person = { ...MOCK_LUKE };
    const mockState: FilmState = {
      ...MOCK_FILM_STATE,
      filmList: [{ ...MOCK_NEW_HOPE }],
    };

    const expected: Person = {
      ...MOCK_LUKE,
      film_list: [
        {
          image_url: MOCK_NEW_HOPE.image_url,
          title: MOCK_NEW_HOPE.title,
        },
      ],
    };

    const output = mapFilmsToCharacter(mockPerson, mockState);
    expect(output).toEqual(expected);
  });
});
