import { SetMetadata } from '@nestjs/common';
import { Role } from '../interfaces/role.enum';

export const ROLES_KEY = 'Admin';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
