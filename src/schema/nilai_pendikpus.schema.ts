import { pgTable, integer, real } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const nilai_pendikpus = pgTable('nilai_pendikpus', {
  user_id: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  pendikpus_id: integer('pendikpus_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  nilai: real('nilai').notNull(),
});
