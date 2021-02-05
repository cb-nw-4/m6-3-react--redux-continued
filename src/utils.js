const round = (value, precision) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const numFormat = (number) => {
  if (number < 1000) {
    return number;
  }

  if (number > 999 && number < 1000000) {
    return round((number / 1000), 1) + 'K';
  }

  if (number > 999999 && number < 1000000000) {
    return round((number / 1000000), 1) + 'M';
  }

  if (number > 999999999) {
    return round((number / 1000000000), 1) + 'B';
  }
};
