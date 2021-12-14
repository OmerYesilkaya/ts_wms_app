import client from './client';

import { ProfileType, User } from '@app/types';

const profilesEndPoint = 'users/USERID/profiles';

const getProfiles = (user: User) => {
  return client.get(profilesEndPoint.replace('USERID', user.oid));
};
const addProfile = (user: User, profile: ProfileType) => {
  const data = {
    name: profile.name,
    gender: profile.gender,
    birthdate: profile.birthdate,
  };

  return client.post(profilesEndPoint.replace('USERID', user.oid), data);
};

const updateProfile = (user: User, profile: ProfileType) => {
  const data = {
    name: profile.name,
    gender: profile.gender,
    birthdate: profile.birthdate,
  };

  return client.put(
    profilesEndPoint.replace('USERID', user.oid) + '/' + profile.profile_id,
    data
  );
};

const deleteProfile = (user: User, profile: ProfileType) => {
  return client.delete(
    profilesEndPoint.replace('USERID', user.oid) + '/' + profile.profile_id
  );
};

export default {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
};
