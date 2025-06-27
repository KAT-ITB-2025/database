import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, integer, unique, serial, boolean, real } from 'drizzle-orm/pg-core';
import { getNow } from '../drizzle-schema-util';
import { user } from './user.schema';

export const userStageProgressStatusEnum = pgEnum('user_stage_progress_enum', [
  'completed',
  'in_progress',
  'locked'
]);

export const stage = pgTable('stage', {
  id: serial('id').primaryKey(),
  stageNumber: integer('stage_number').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  availableDate: timestamp('available_date', {
    mode: 'date',
    withTimezone: true
  }),
  deadlineDate: timestamp('deadline_date', {
    mode: 'date',
    withTimezone: true
  }),
  quizWeight: real('quiz_weight').default(1.0).notNull(),           // bobot kuis
  roleplayWeight: real('roleplay_weight').default(0.0).notNull(),   // bobot input roleplay
  lgdWeight: real('lgd_weight').default(0.0).notNull(),             // bobot input lgd
  stageWeight: real('stage_weight').default(0.0).notNull(),         // bobot profile (a.k.a. stage) untuk total nilai
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow)
});

export const userStageProgress = pgTable('user_stage_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' }),
  stageId: serial('stage_id')
    .references(() => stage.id, { onDelete: 'cascade' }),
  status: userStageProgressStatusEnum('status').default('in_progress').notNull(),
  completedAt: timestamp('completed_at'),
  quizScore: integer('quiz_score'),           // score kuis
  roleplayScore: integer('roleplay_score'),   // score roleplay (input pendikpus)
  lgdScore: integer('lgd_score'),             // score lgd (input pendikpus)
  updatedAt: timestamp('updated_at').$onUpdate(getNow)
}, (table) => [
  unique('user_stage_unique')
    .on(table.userId, table.stageId)
]);

export const material = pgTable('material', {
  id: serial('id').primaryKey(),
  stageId: serial('stage_id')
    .references(() => stage.id, { onDelete: 'cascade' }),
  profile: text('profile')
});

export const dialog = pgTable('dialog', {
  id: serial('id').primaryKey(),
  materialId: serial('material_id')
    .references(() => material.id, { onDelete: 'cascade' }),
  content: text('content'),
  order: integer('order').notNull()
});

export const quiz = pgTable('quiz', {
  id: serial('id').primaryKey(),
  stageId: serial('stage_id')
    .references(() => stage.id, { onDelete: 'cascade' }),
});

export const question = pgTable('question', {
  id: serial('id').primaryKey(),
  quizId: serial('quiz_id')
    .references(() => quiz.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  order: integer('order').notNull(),
});

export const answerOption = pgTable('answer_option', {
  id: serial('id').primaryKey(),
  questionId: serial('question_id')
    .references(() => question.id),
  option: text('option').notNull(),
  optionStatus: boolean('option_status').notNull()
})

/**
 * Relations
 */
export const stageRelation = relations(stage, ({ many }) => ({
  userStageProgresses: many(userStageProgress),
  materials: many(material),
  quizzes: many(quiz)
}));

export const userStageProgressRelation = relations(userStageProgress, ({ one }) => ({
  stage: one(stage, {
    fields: [userStageProgress.stageId],
    references: [stage.id],
  })
}));

export const quizRelation = relations(quiz, ({ one, many }) => ({
  questions: many(question),
  stage: one(stage, {
    fields: [quiz.stageId],
    references: [stage.id],
  }),
}));

export const questionsRelation = relations(question, ({ one }) => ({
  quiz: one(quiz, {
    fields: [question.quizId],
    references: [quiz.id],
  })
}));

export const questionRelation = relations(question, ({ many }) => ({
  answerOptions: many(answerOption)
}));

export const answerOptionRelation = relations(answerOption, ({ one }) => ({
  question: one(question, {
    fields: [answerOption.questionId],
    references: [question.id],
  })
}));

export const materialRelation = relations(material, ({ one, many }) => ({
  dialogs: many(dialog),
  stage: one(stage, {
    fields: [material.stageId],
    references: [stage.id],
  })
}));

export const dialogRelation = relations(dialog, ({ one }) => ({
  material: one(material, {
    fields: [dialog.materialId],
    references: [material.id],
  })
}));