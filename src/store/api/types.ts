/// common ///
export interface IBaseQuery {
  page: number;
}

export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/// Character ///
export interface ICharacterLocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ICharacterLocation;
  location: ICharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharacterFilter {
  name: string | null;
  status: 'alive' | 'dead' | 'unknown' | null;
  species: 'human' | 'humanoid' | 'alien' | 'unknown' | null;
  type: string | null;
  gender: 'female' | 'male' | 'genderless' | 'unknown' | null;
}

export interface ICharacterResponse {
  info: IInfo;
  results: ICharacter[];
}

export type ICharacterQuery = IBaseQuery & ICharacterFilter;

/// Location ///

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ILocationResponse {
  info: IInfo;
  results: ILocation[];
}

interface ILocationFilter {
  name: string | null;
  type: string | null;
  dimension: string | null;
}

export type ILocationQuery = IBaseQuery & ILocationFilter;

/// Episode ///

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IEpisodeResponse {
  info: IInfo;
  results: IEpisode[];
}

interface IEpisodeFilter {
  name: string | null;
  episode: string | null;
}

export type IEpisodeQuery = IBaseQuery & IEpisodeFilter;
