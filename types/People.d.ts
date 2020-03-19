export interface PeopleResponse {
  count: number;
  next: string;
  previous: number;
  results: Person[];
}

export interface PersonFilmType {
  image_url: string;
  title: string;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
  image_url?: string;
  id?: number;
  film_list?: PersonFilmType[] | null;
}

export interface PeopleState {
  peopleList: Person[];
  currentPerson: Person | null;
  isBusy: boolean;
}
