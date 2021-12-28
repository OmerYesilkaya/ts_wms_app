import { MeasurementData, ProfileType } from '@app/types';
import { ApiErrorResponse, ApiOkResponse } from 'apisauce';
import cache from '../utility/cache';

const addLocalMeasurement = async (measurement: MeasurementData) => {
  const cacheKey = measurement.profile_id;

  var data = cacheKey ? await cache.get(cacheKey) : null;
  if (data === null || !cacheKey) {
    data = [];
    return { ok: false, data: data } as ApiErrorResponse<any>;
  }
  data.push(measurement);
  cache.store(cacheKey, data);

  return { ok: true, data: data } as ApiOkResponse<any>;
};

const getLocalMeasurements = async (profile: MeasurementData) => {
  const cacheKey = profile.profile_id;

  var data = cacheKey ? await cache.get(cacheKey) : null;
  if (data === null) {
    data = [];
  }
  let latest = data
    .sort((a: MeasurementData, b: MeasurementData) =>
      (a.recordDateUnix ?? 0) > (b.recordDateUnix ?? 0) ? 1 : -1
    )
    .map((item: ProfileType) => item);

  return { ok: true, data: latest } as ApiOkResponse<any>;
};

export default {
  addLocalMeasurement,
  getLocalMeasurements,
};
