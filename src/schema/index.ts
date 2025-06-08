import { db } from '~/migrate';

export * from './user.schema';
export * from './auth.schema';
export * from './media.schema';

export type Database = typeof db;
