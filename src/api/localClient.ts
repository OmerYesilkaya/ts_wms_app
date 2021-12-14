import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from '@app/lib';

const prefix = 'cache';
let latestProfiles = [];

// const readLocalProfiles = async () => {
//   //const deleteAllCache = await cache.totalClear();
//   const data = await cache.get("/profiles");
//   return { ok: true, data: data };
// };

// const clearLocalProfiles = () => {
//   cache.clear("/profiles");
// };
// const addLocalProfile = async (user,profile) => {
//   var data = await cache.get("/profiles");
//   if (data === null) {
//     data = [];
//   }
//   data.push(profile);
//   cache.store("/profiles", data);
//   latestProfiles = data;
//   return { ok: true, data: data };
// };

// const readLocalProfile = async (profile_id) => {
//   var data = await cache.get("/profiles");
//   if (data === null) {
//     return null;
//   }

//   return { ok: true, data: data.filter((t) => t.profile_id == profile_id) };
// };

// const updateLocalProfile = (profile) => {};

// const deleteLocalProfile = (id) => {};

const addLocalMeasurement = async (measurement) => {
  const cacheKey = measurement.profile_id;

  var data = await Cache.get(cacheKey);
  if (data === null) {
    data = [];
  }
  data.push(measurement);
  Cache.store(cacheKey, data);

  // for (let index = 0; index < data.length; index++) {
  //     data[index].shoeSize = measurement.shoeSize
  //     data[index].shoeWidth = measurement.shoeWidth
  //     data[index].lastMeasurement = measurement.recordDate
  //     data[index].lastMeasurementUnix = measurement.recordDateUnix
  //     data[index].measurements.push(measurement)

  //     cache.store(cacheKey, data)
  //     latestProfiles = data
  //     return { ok: true, data: data[index] }
  // }
  return { ok: true, data: data };
};

const getLocalMeasurements = async (profile) => {
  const cacheKey = profile.profile_id;

  var data = await Cache.get(cacheKey);
  if (data === null) {
    data = [];
  }
  let latest = data
    .sort((a, b) => (a.recordDateUnix > b.recordDateUnix ? 1 : -1))
    .map((item) => item);

  return { ok: true, data: latest };
};

// const readLocalMeasurements = (profile_id) => {};

export default {
  addLocalMeasurement,
  getLocalMeasurements,
};
