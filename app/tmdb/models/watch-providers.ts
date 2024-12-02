import type { GetLanguagesResponse } from './language';

export interface FlatRate {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface Rent extends FlatRate {}

export interface Buy extends FlatRate {}

export interface WatchLocaleItem {
  link: string;
  flatrate: FlatRate[];
  rent: Rent[];
  buy: Buy[];
}

type CountryCode =
  | 'AR'
  | 'AT'
  | 'AU'
  | 'BE'
  | 'BR'
  | 'CA'
  | 'CH'
  | 'CL'
  | 'CO'
  | 'CZ'
  | 'DE'
  | 'DK'
  | 'EC'
  | 'EE'
  | 'ES'
  | 'FI'
  | 'FR'
  | 'GB'
  | 'GR'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IN'
  | 'IT'
  | 'JP'
  | 'KR'
  | 'LT'
  | 'LV'
  | 'MX'
  | 'MY'
  | 'NL'
  | 'NO'
  | 'NZ'
  | 'PE'
  | 'PH'
  | 'PL'
  | 'PT'
  | 'RO'
  | 'RU'
  | 'SE'
  | 'SG'
  | 'TH'
  | 'TR'
  | 'US'
  | 'VE'
  | 'ZA';

export type WatchLocale = {
  [key in CountryCode]: WatchLocaleItem;
};

export interface WatchProviders {
  id: number;
  results: WatchLocale;
}

export interface GetWatchProvidersResponse {
  results: WatchProvider[];
}

export interface GetAvailableRegionsResponse {
  results: GetLanguagesResponse;
}

export interface WatchProvider extends FlatRate {
  display_priorities: Record<string, number>;
}
