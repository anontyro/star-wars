export interface Film {
  id?: number;
  image_url?: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date | string;
  edited: Date | string;
  url: string;
}

export interface FilmResponse {
  response: Film[];
}
