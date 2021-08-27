import { ParsedUrlQuery } from 'querystring';

export interface IParams extends ParsedUrlQuery {
  uuid: string;
}

export interface CoinProps {
  data: Coin;
}

export interface Coin {
  name: string;
  description: string;
  iconUrl: string;
  color: string;
  uuid: string;
  websiteUrl: string;
  price: string;
}