import {
  BAD_COOKIE,
  INVALID_CREDENTIALS,
  MISSING_COOKIE,
} from '../constants/constants';

type TValidCodes =
  | typeof INVALID_CREDENTIALS
  | typeof MISSING_COOKIE
  | typeof BAD_COOKIE;
export type TError = { code: TValidCodes; message: string };
