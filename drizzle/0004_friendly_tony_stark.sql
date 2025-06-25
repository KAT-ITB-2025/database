ALTER TABLE "nilai_pendikpus" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "nilai_pendikpus" CASCADE;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ALTER COLUMN "status" SET DEFAULT 'in_progress';--> statement-breakpoint
ALTER TABLE "stage" ADD COLUMN "deadline_date" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "stage" ADD COLUMN "quiz_weight" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD COLUMN "mentor_input" integer;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD COLUMN "updated_at" timestamp;