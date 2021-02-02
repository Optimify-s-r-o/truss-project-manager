export const fixed = (value: string | number, digits: number) => {
  if (value !== undefined && value !== null) {
    return Number(value).toFixed(digits) + ' '; //TODO round
  }
  return value;
};

export const uppercase = (value: string | undefined | null): string => {
  if (value !== undefined && value !== null && value) {
    return value.toUpperCase();
  }
  return '';
};
