import { MeasurementData, UserType } from '@app/types';
import client from './client';

const profilesEndPoint = 'users/USERID/profiles/PROFILEID/profile-measurements';
const convertUnixDate2Iso = (unixSecs: number) => {
  const dateObject = new Date(1970, 0, 1); // Epoch
  dateObject.setSeconds(unixSecs);
  return dateObject.toISOString();
};

const addProfileMeasurement = (
  user: UserType,
  profileMeasurement: MeasurementData
) => {
  let data = {
    weight: Number(profileMeasurement.weight),
    height: Number(profileMeasurement.bodySize),
    shoe_size: profileMeasurement.shoe_size,
    shoe_width: profileMeasurement.shoe_width,
    createdAt: convertUnixDate2Iso(profileMeasurement.recordDateUnix ?? 0),
  };

  if (profileMeasurement.storeId) {
    // disabled till shops comes from backend
    // data.shop_id = profileMeasurement.storeId;
  }

  return client.post(
    profilesEndPoint
      .replace('USERID', user.oid)
      .replace('PROFILEID', profileMeasurement.profile_id ?? ''),
    data
  );
};

export default {
  addProfileMeasurement,
};
