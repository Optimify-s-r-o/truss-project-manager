import { createProxy } from '../../../utils/getPath';
import { FetchStateType } from '../../../types/_types';

export interface PriceList {
  Id?: string;
  Name?: string;
  Items?: PriceListItem[];
}

export interface PriceLists {
  PriceLists: PriceList[];
}

export interface PriceListsPlates {
  Plates: PriceListPlate[];
}

export interface PriceListItem {
  PriceListId?: string;
  Id?: string;
  Name?: string;
  QuantityInUnit?: number;
  Price?: number;
  IsDefault?: boolean;
}
export interface PriceListPlate {
  Name: string;
  Type: string;
  Thickness: number;
  Width: number;
  Length: number;
  QuantityPerBox: number;
  Price: number;
  Material: number;
  Id: string;
}
export const PriceListItemProxy = createProxy<PriceListItem>();

export type PriceListsStateType = FetchStateType &
  Readonly<{
    priceLists: PriceList[];
    priceList: PriceList;
    priceListsPlates: PriceListPlate[];
  }>;
