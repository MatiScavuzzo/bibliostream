export interface Keyword {
  name: string;
  id: number;
}

export interface GetKeywordsResponse {
  id: number;
  results?: Keyword[];
  keywords?: Keyword[];
}
