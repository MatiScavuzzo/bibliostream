type Genre = {
  id: number;
  name: string;
};

export interface GetGenresResponse {
  genres: Genre[];
}
