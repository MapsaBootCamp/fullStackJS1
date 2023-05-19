import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/todos/schemas/user.schema';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
