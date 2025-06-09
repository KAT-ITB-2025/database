CREATE TYPE "public"."user_stage_progress_enum" AS ENUM('completed', 'in_progress', 'locked');--> statement-breakpoint
CREATE TABLE "answer_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" serial NOT NULL,
	"option" text NOT NULL,
	"option_status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dialog" (
	"id" serial PRIMARY KEY NOT NULL,
	"material_id" serial NOT NULL,
	"content" text,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_id" serial NOT NULL,
	"profile" text
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" serial NOT NULL,
	"question" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stage" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_number" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"available_date" timestamp with time zone,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_stage_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"stage_id" serial NOT NULL,
	"status" "user_stage_progress_enum" DEFAULT 'locked' NOT NULL,
	"score" integer,
	"completed_at" timestamp,
	CONSTRAINT "user_stage_unique" UNIQUE("user_id","stage_id")
);
--> statement-breakpoint
ALTER TABLE "answer_option" ADD CONSTRAINT "answer_option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dialog" ADD CONSTRAINT "dialog_material_id_material_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."material"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material" ADD CONSTRAINT "material_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;