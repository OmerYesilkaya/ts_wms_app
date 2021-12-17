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

export default { now, toFormattedDate };
