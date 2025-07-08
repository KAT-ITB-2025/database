import { pgTable, text } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const divisi = pgTable('divisi', {
  id: text('id').primaryKey(),
  nama: text('nama').notNull(),
  link_grup: text('link_group').notNull(),
});

export const announcement = pgTable('announcement', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  divisi_id: text('divisi_id')
    .notNull()
    .references(() => divisi.id, { onDelete: 'cascade' }),
});
