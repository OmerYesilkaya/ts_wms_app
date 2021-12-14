/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Gender, ProfileType } from './profile';
import { Size } from './style';
import { AuthContext, User, JwtUserPayload } from './auth';
import {
  InterpolateOptions,
  LocaleContext,
  Message,
  Scope,
  TranslateOptions,
} from './locale';
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabScreenProps,
  RootTabParamList,
} from './navigation';

// ENUMS
export { Size, Gender };

// TYPES
export type {
  AuthContext,
  JwtUserPayload,
  User,
  InterpolateOptions,
  LocaleContext,
  Message,
  Scope,
  ProfileType,
  RootTabScreenProps,
  RootStackScreenProps,
  RootStackParamList,
  RootTabParamList,
  TranslateOptions,
};
