import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './user.schema';
import { getNow } from '../drizzle-schema-util';

export const accountRoleEnum = pgEnum('account_role_enum', [
  'admin',
  'mamet',
  'mentor',
  'user',
  'guest',
]);

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  nim: text('nim').notNull().unique(),
  password: text('password').notNull(),
  role: accountRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const resetPasswordToken = pgTable('reset_password_token', {
  id: text('id')
    .primaryKey()
    .references(() => account.id),
  token: text('token'),
  tokenExpiration: timestamp('token_expiration'),
});

export const accountRelation = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.id],
    references: [user.id],
  }),
  resetPasswordToken: one(resetPasswordToken, {
    fields: [account.id],
    references: [resetPasswordToken.id],
  }),
}));
