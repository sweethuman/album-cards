export interface CreateResponse {
  status: string;
  data: AlbumData;
}

export interface AlbumData {
  type: string;
  id: number;
  path: string;
  name: string;
  url: string;
  sourceUrl: string;
  sourceCountry: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  refreshedAt: Date;
  image: string;
  links: { [key: string]: Link[] };
  linksCountries: string[];
  artists: Artist[];
}

export interface Artist {
  type: string;
  id: number;
  path: string;
  name: string;
  sourceUrl: string;
  sourceCountry: string;
  url: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  refreshedAt: Date;
  linksCountries: string[];
  links: { [key: string]: Link[] };
  description: string;
  serviceIds: ServiceIDS;
  orchardId?: string;
  spotifyId?: string;
}

export interface Link {
  link: string;
  countries: string[] | null;
}

export interface ServiceIDS {
  tidal: string;
  amazon: string;
  deezer: string;
  itunes: string;
  discogs?: string;
  napster: string;
  pandora: string;
  spotify: string;
  bandcamp: string;
  googleplay: string;
  soundcloud: string;
  musicBrainz?: string;
}
