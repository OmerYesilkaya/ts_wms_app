import cache from '../utility/cache';

const addLocalMeasurement = async (measurement) => {
  const cacheKey = measurement.profile_id;

  var data = await cache.get(cacheKey);
  if (data === null) {
    data = [];
  }
  data.push(measurement);
  cache.store(cacheKey, data);

  return { ok: true, data: data };
};

const getLocalMeasurements = async (profile) => {
  const cacheKey = profile.profile_id;

  var data = await cache.get(cacheKey);
  if (data === null) {
    data = [];
  }
  let latest = data
    .sort((a, b) => (a.recordDateUnix > b.recordDateUnix ? 1 : -1))
    .map((item) => item);

  return { ok: true, data: latest };
};

export default {
  addLocalMeasurement,
  getLocalMeasurements,
};
