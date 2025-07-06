// src/schema/links.schema.ts
import { pgTable, text } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  link: text('link').notNull(),
  type: text('type').notNull(),
});
