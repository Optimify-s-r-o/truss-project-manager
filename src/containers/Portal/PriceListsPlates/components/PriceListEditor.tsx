import * as _ from 'lodash';
import React from 'react';
import { GridRow } from '../../../../constants/globalStyles';
import { lang } from '../../../../translation/i18n';
import { PriceListPlate } from '../../PriceLists/_types';
import { TitleQuotation } from '../../Quotations/components/QuotationTitle';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TABLE_STYLE_CONDENSED,
} from '../../../../components/Optimify/Table';

import {
  PLGrid,
  PLName,
  PLQuantity,
  PLPrice,
} from '../../PriceLists/components/PriceListEditor';

interface QuotationEditor {
  priceListsPlates: PriceListPlate[];
}

export const PriceListEditor = ({ priceListsPlates }: QuotationEditor) => {
  const { t } = useTranslation();

  return (
    <>
      <GridRow columns={1}>
        <TitleQuotation>
          {t(translationPath(lang.priceLists.plates).path)}
        </TitleQuotation>
        <PLGrid>
          <Table
            style={TABLE_STYLE_CONDENSED}
            headers={[
              t(translationPath(lang.priceLists.name).path),
              t(translationPath(lang.priceLists.width).path),
              t(translationPath(lang.priceLists.length).path),
              t(translationPath(lang.priceLists.thickness).path),
              t(translationPath(lang.priceLists.price).path),
            ]}
            sortable={[true, true, true, true, true, false]}
            data={
              priceListsPlates
                ? priceListsPlates?.map(
                    (value: PriceListPlate, index: number) => {
                      return [
                        value.Name,
                        value.Width,
                        value.Length,
                        value.Thickness,
                        value.Price,
                        value,
                      ];
                    }
                  )
                : []
            }
            renderers={[
              (value: any, key: number, parent: PriceListPlate) => {
                return <div>{value}</div>;
              },
              (value: any, key: number, parent: PriceListPlate) => {
                return <div>{value}</div>;
              },
              (value: any, key: number, parent: PriceListPlate) => {
                return <div>{value}</div>;
              },
              (value: any, key: number, parent: PriceListPlate) => {
                return <div>{value}</div>;
              },
              (value: any, key: number, parent: PriceListPlate) => {
                return <div>{value}</div>;
              },
            ]}
          />
        </PLGrid>
      </GridRow>
    </>
  );
};
