import { create } from 'apisauce';

import { SETTINGS } from '@app/constants';
import { AuthStorage, Cache } from '@app/lib';

type ClientResponse = {
  statusCode: number;
};

const apiClient = create({
  baseURL: SETTINGS.apiUrl,
});

//   const lc = localClient;

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await AuthStorage.getToken();
  if (!authToken) return;
  request.headers['Authorization'] = `Bearer ${authToken}`;
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get<ClientResponse>(url, params, axiosConfig);

  if (response.ok) {
    //Exceptionally we have to compare local and live profile data here..
    //It is not the best place, but most proper for now.

    if (url.endsWith('/profiles')) {
      // read Cache profiles
      console.log('LOADING PROFILES');

      // Cache.store(url, response.data);

      // read live profiles
      const lP = response['data'];
      for (let liveIndex = 0; liveIndex < lP.length; liveIndex++) {
        //get local measurements of thisprofile id;
        const cP = await Cache.get(lP[liveIndex].profile_id);
        console.log('CP', cP);
        if (cP) {
          if (cP.length > 0) {
            let latest = cP
              .sort((a, b) => (a.recordDateUnix > b.recordDateUnix ? -1 : 1))
              .map((item) => item);

            lP[liveIndex].lastMeasurementUnix = latest[0].recordDateUnix;
            lP[liveIndex].lastMeasurementSize = latest[0].shoeSize;
            lP[liveIndex].shoeWidth = latest[0].shoeWidth;
          }
        }
      }

      response.data = lP;
      return response;
    }

    //Cache.store(url, response["data"]);
    return response;
  } else if (response.data) {
    //check for user token valid
    if (response.data.statusCode === 401) {
      console.log('TOKEN EXPIRED!');
      return { ok: false, status: response.data.statusCode };
    }
  }

  const data = await Cache.get(url);
  return data
    ? { ok: true, status: response.data?.statusCode, data }
    : { ok: false, status: response.data?.statusCode };
};

export default apiClient;

// apiClient.get = async (url, params, axiosConfig) => {
//   //   const response = await get(url, params, axiosConfig);

//   // if (response.ok) {
//   //   Cache.store(url, response.data);
//   //   return response;
//   // }

//   // WORK LOCAL ONLY FOR NOW
//   const data = await Cache.get(url);
//   return data ? { ok: true, data } : response;
// };

// export default apiClient;
