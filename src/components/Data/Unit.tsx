import React from 'react';

export enum UnitType {
  KG = 'KG',
  MM = 'MM',
  KNM2 = 'KNM2',
  KCM2 = 'KCM2',
  KCM3 = 'KCM3',
  M3M2 = 'M3M2',
  KGM2 = 'KGM2',
  M3 = 'M3',
  M2 = 'M2',
  KC = 'KC',
  DEGREE = 'DEGREE',
  EMPTY = 'EMPTY'
}

interface IOwnProps {
  unit: UnitType;
}

export const Unit = (props: IOwnProps) => {
  const { unit } = props;

  switch (unit) {
    case UnitType.KG:
      return <>kg</>;
    case UnitType.MM:
      return <>mm</>;
    case UnitType.KNM2:
      return (
        <>
          kN / m<sup>2</sup>
        </>
      );
    case UnitType.KCM2:
      return (
        <>
          Kč / m<sup>2</sup>
        </>
      );
    case UnitType.KCM3:
      return (
        <>
          Kč / m<sup>3</sup>
        </>
      );
    case UnitType.M3M2:
      return (
        <>
          m<sup>3</sup> / m<sup>2</sup>
        </>
      );
    case UnitType.KGM2:
      return (
        <>
          kg / m<sup>2</sup>
        </>
      );
    case UnitType.M3:
      return (
        <>
          m<sup>3</sup>
        </>
      );
    case UnitType.M2:
      return (
        <>
          m<sup>2</sup>
        </>
      );
    case UnitType.KC:
      return <>Kč</>;
    case UnitType.DEGREE:
      return <>°</>;
    case UnitType.EMPTY:
      return <></>;
    default:
      return <></>;
  }
};
