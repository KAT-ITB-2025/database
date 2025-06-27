ALTER TABLE "user_stage_progress" RENAME COLUMN "score" TO "quiz_score";--> statement-breakpoint
ALTER TABLE "user_stage_progress" RENAME COLUMN "mentor_input" TO "roleplay_score";--> statement-breakpoint
ALTER TABLE "stage" ALTER COLUMN "quiz_weight" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "stage" ADD COLUMN "roleplay_weight" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "stage" ADD COLUMN "lgd_weight" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "stage" ADD COLUMN "stage_weight" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD COLUMN "lgd_score" integer;