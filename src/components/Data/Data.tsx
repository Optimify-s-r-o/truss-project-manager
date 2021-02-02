import DataRow from '../Optimify/Form/DataRow';
import lang from '../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import { translationPath } from '../../utils/getPath';
import { Unit } from './Unit';
import { UnitType } from './Unit';
import { useTranslation } from 'react-i18next';

interface IOwnProps {
  data: number | string | null | React.ReactNode;
  unit: UnitType;
  title: string;
  titleWidth?: number | undefined | null;
}

const Data = (props: IOwnProps) => {
  const { data, title, unit, titleWidth } = props;
  const { t } = useTranslation();
  return (
    <DataRow title={title} titleWidth={titleWidth ? titleWidth : 40}>
      {data ? (
        <>
          <Value>{data}</Value>
          <UnitValue unit={unit} />
        </>
      ) : (
        t(translationPath(lang.common.unavailable).path)
      )}
    </DataRow>
  );
};

export default Data;

export const Value = styled.div`
  min-width: 80px;
`;

export const UnitValue = styled(Unit)`
  padding-left: 7px;
`;
