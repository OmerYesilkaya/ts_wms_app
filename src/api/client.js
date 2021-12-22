import { create } from 'apisauce';
import { cache } from '@app/utility';
import { storage as authStorage } from '@app/auth';
import { SETTINGS } from '@app/constants';

const apiClient = create({
  baseURL: SETTINGS.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['Authorization'] = `Bearer ${authToken}`;
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    //Exceptionally we have to compare local and live profile data here..
    //It is not the best place, but most proper for now.

    if (url.endsWith('/profiles')) {
      // read live profiles
      const lP = response['data'];
      for (let liveIndex = 0; liveIndex < lP.length; liveIndex++) {
        //get local measurements of thisprofile id;
        let cP = lP[liveIndex].measurements;

        if (cP) {
          for (let c = 0; c < cP.length; c++) {
            let date = new Date(cP[c].createdAt); // some mock date
            cP[c].recordDateUnix = date.getTime() / 1000;
          }

          if (cP.length > 0) {
            let latest = cP
              .sort((a, b) => (a.recordDateUnix > b.recordDateUnix ? -1 : 1))
              .map((item) => item);

            lP[liveIndex].lastMeasurementUnix = latest[0].recordDateUnix;
            lP[liveIndex].lastMeasurementSize = latest[0].shoe_size;
            lP[liveIndex].shoe_width = latest[0].shoe_width;
            lP[liveIndex].weight = latest[0].weight;
            lP[liveIndex].height = latest[0].height;
          }
        }
      }

      response.data = lP;
      return response;
    }

    return response;
  } else if (response.data) {
    //check for user token valid
    if (response.data.statusCode === 401) {
      return { ok: false, status: response.data.statusCode };
    }
  }

  const data = await cache.get(url);
  return data
    ? { ok: true, status: response.data.statusCode, data }
    : { ok: false, status: response.data.statusCode };
};

export default apiClient;
