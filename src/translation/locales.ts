// import enGB from "./dictionary/enGB";
// import skSK from "./dictionary/deDE";

interface Languages {
  [s: string]: LanguageSetting;
}

export interface LanguageSetting {
  label: string;
}

export const FALLBACK_LANG = 'en-GB';

export const LANGUAGES: Languages = {
  'cs-CZ': {
    label: 'Česky'
  }
  // "en-GB": {
  //   FIRST_DAY: 0,
  //   MONTHS: enGB.common.calendar.months,
  //   WEEKDAYS_LONG: enGB.common.calendar.weekdaysLong,
  //   WEEKDAYS_SHORT: enGB.common.calendar.weekdaysShort,
  //   label: "English"
  // },
  // "de-DE": {
  //   FIRST_DAY: 0,
  //   MONTHS: skSK.common.calendar.months,
  //   WEEKDAYS_LONG: enGB.common.calendar.weekdaysLong,
  //   WEEKDAYS_SHORT: enGB.common.calendar.weekdaysShort,
  //   label: "Deutsch"
  // }
};
