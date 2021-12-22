function now() {
  return new Date().toLocaleString('de-LI', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function toFormattedDate(date?: Date) {
  if (!date) return now();
  return date.toLocaleString('de-LI', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const unixDateFormat = (unixTime: number) => {
  const dateObject = new Date(1970, 0, 1); // Epoch
  dateObject.setSeconds(unixTime);
  return dateObject;
};

export default { now, toFormattedDate, unixDateFormat };
