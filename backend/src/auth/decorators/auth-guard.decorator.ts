import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const IS_REFRESH_GUARD = 'isRefreshGuard';

export const Public = () => SetMetadata(IS_PUBLIC, true);
export const Refresh = () => SetMetadata(IS_REFRESH_GUARD, true);
