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
  gender: Gender;
  measurements: any[]; // fix
  FPs?: any; // ??
};
