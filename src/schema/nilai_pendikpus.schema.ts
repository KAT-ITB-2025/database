import { pgTable, integer, real, text } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const nilai_pendikpus = pgTable('nilai_pendikpus', {
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  pendikpus_id: text('pendikpus_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  nilai: real('nilai').notNull(),
});
