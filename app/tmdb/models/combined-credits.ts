import type { MediaType } from './commons';
import type { MovieWithMediaType } from './movie';
import type { TvShowWithMediaType } from './tv';

export interface CombinedCredit {
  id: number;
  adult: boolean;
  title: string;
  date: string;
  media_type: MediaType;
  role: string;
  vote_average: number;
  vote_count: number;
  backdrop_path?: string;
  department?: string;
}

export type RawMovieCredit = MovieWithMediaType &
  CombinedCredit & {
    character: string;
    release_date: string;
    order: number;
    department: string;
    job: string;
    credit_id: string;
  };

export type RawTvShowCredit = TvShowWithMediaType &
  CombinedCredit & {
    character: string;
    order: number;
    episode_count: number;
    first_aird_Date: string;
    job: string;
    department: string;
    credit_id: string;
  };

export type RawCombinedCredit = RawMovieCredit | RawTvShowCredit;

export interface CombinedCreditsResponse {
  cast: RawCombinedCredit[];
  crew: RawCombinedCredit[];
}

export interface CombinedCredits {
  cast: CombinedCredit[];
  crew: CombinedCredit[];
}
