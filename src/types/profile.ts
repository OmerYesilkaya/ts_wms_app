export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  NOT_SPECIFIED = 'NOT_SPECIFIED',
}

export type ProfileType = {
  profile_id: string | null;
  user_id?: string | null;
  name: string;
  birthdate: Date | string | null;
  shoeSize: string;
  shoeWidth: string;
  lastMeasurement: string;
  lastMeasurementSize?: string;
  lastMeasurementUnix?: number;
  shoe_width?: string;
  weight?: string;
  height?: string;
  gender: Gender;
  measurements: any[]; // fix
  FPs?: any; // ??
};

export type MeasurementData = {
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
