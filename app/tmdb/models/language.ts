export type Language =
  | 'en-US'
  | 'es-MX'
  | 'es-AR'
  | 'fr-FR'
  | 'de-DE'
  | 'it-IT'
  | 'pt-BR'
  | 'ja-JP';

export interface GetLanguagesResponse {
  english_name: string;
  iso_639_1: string;
  name: string;
}
[];
