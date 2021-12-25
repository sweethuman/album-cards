export interface SearchResponse {
  status: string;
  data: Data;
}

export interface Data {
  artists: Album[];
  albums: Album[];
  tracks: Album[];
}

export interface Album {
  type: Type;
  sourceUrl: string;
  name: string;
  artists?: Artist[];
  image: string;
}

export interface Artist {
  name: string;
  sourceUrl: string;
}

export enum Type {
  Album = "album",
  Artist = "artist",
  Track = "track",
}
export const EmptySearchResponse: SearchResponse = { status: "success", data: { artists: [], albums: [], tracks: [] } };
