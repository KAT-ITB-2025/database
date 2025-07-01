// src/schema/kelas.ts
import { pgTable, integer, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const kelasTypeEnum = pgEnum('kelas_type_enum', [
  'skill',
  'issue',
]);

export const kelas = pgTable('kelas', {
  id_kelas: text('id_kelas').primaryKey(),
  kuota: integer('kuota').notNull(),
  judul: text('judul').notNull(),
  deskripsi: text('deskripsi').notNull(),
  pembicara: text('pembicara').notNull(),
  type: kelasTypeEnum("type").notNull()
});

export const pemilihan_kelas = pgTable('pemilihan_kelas', {
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  kelas_id: text('kelas_id')
    .notNull()
    .references(() => kelas.id_kelas, { onDelete: 'cascade' }),

  waktu: timestamp('waktu').defaultNow().notNull(),
  prioritas: integer('prioritas').notNull(),
});

export const peserta_kelas = pgTable('peserta_kelas', {
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  kelas_id: text('kelas_id')
    .notNull()
    .references(() => kelas.id_kelas, { onDelete: 'cascade' }),
});
