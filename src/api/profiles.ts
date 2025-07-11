import { ProfileType, UserType } from '@app/types';
import client from './client';

const profilesEndPoint = 'users/USERID/profiles';

const getProfiles = (user: UserType) => {
  return client.get(profilesEndPoint.replace('USERID', user.oid));
};

const addProfile = (user: UserType, profile: ProfileType) => {
  const data = {
    name: profile.name,
    gender: profile.gender,
    birthdate: profile.birthdate,
  };

  return client.post(profilesEndPoint.replace('USERID', user.oid), data);
};

const updateProfile = (user: UserType, profile: ProfileType) => {
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

const deleteProfile = (user: UserType, profile: ProfileType) => {
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
