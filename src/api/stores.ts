import { ApiOkResponse } from 'apisauce';
import cache from '../utility/cache';
import client from './client';

const wmsStoresEndPoint = 'wms-shops';

const getStores = async () => {
  var data = await cache.get(wmsStoresEndPoint);
  if (data === null) {
    return client.get(wmsStoresEndPoint);
  }
  return { ok: true, data: data } as ApiOkResponse<any>;
};

export default {
  getStores,
};
