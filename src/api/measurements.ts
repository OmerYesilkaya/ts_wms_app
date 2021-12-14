import client from './client';

const profilesEndPoint = 'users/USERID/profiles/PROFILEID/profile-measurements';

const addProfileMeasurement = (user, profileMeasurement) => {
  const data = {
    weight: profileMeasurement.weight,
    height: profileMeasurement.bodySize,
    shoe_size: profileMeasurement.shoeSize,
    shoe_width: profileMeasurement.shoeWidth,
    shop_id: profileMeasurement.storeId,
    createdAt: profileMeasurement.recordDate,
  };
  console.log('data before Post', data);

  return client.post(
    profilesEndPoint
      .replace('USERID', user.oid)
      .replace('PROFILEID', profileMeasurement.profile_id),
    data
  );
};

export default {
  addProfileMeasurement,
};
