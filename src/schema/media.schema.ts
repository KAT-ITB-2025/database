import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './user.schema';
import { createId, getNow } from '../drizzle-schema-util';

export const mediaBucketEnum = pgEnum('media_bucket_enum', [
  'core',
  'oskm',
  'dikpus',
  'profile',
  'submission-dikpus',
  'submission-oskm',
  'other',
]);

export const media = pgTable('media', {
  id: text('id').primaryKey().$defaultFn(createId),
  creatorId: text('creator_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').unique().notNull(),
  bucket: mediaBucketEnum('bucket').notNull().default('other'),
  type: text('type').notNull(),
  url: text('url').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(getNow),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const handbook = pgTable('handbook', {
  mediaId: text('media_id')
    .primaryKey()
    .references(() => media.id),
  title: text('title')
});

export const mediaRelation = relations(media, ({ one }) => ({
  handbook: one(handbook, {
    fields: [media.id],
    references: [handbook.mediaId],
  })
}));
