type MeasurementData = {
  measurementDataId?: Date;
  profile_id: string | null;
  bodySize: string;
  recordDate: Date | null;
  recordDateUnix: number | null;
  storeName?: string;
  storeId?: string;
  shoe_size?: string;
  shoe_width?: string;
  weight?: string;
};

export type { MeasurementData };
