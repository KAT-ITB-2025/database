CREATE TYPE "public"."account_role_enum" AS ENUM('admin', 'mamet', 'mentor', 'user', 'guest');--> statement-breakpoint
CREATE TYPE "public"."media_bucket_enum" AS ENUM('core', 'oskm', 'dikpus', 'profile', 'submission-dikpus', 'submission-oskm', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_stage_progress_enum" AS ENUM('completed', 'in_progress', 'locked');--> statement-breakpoint
CREATE TYPE "public"."kelas_type_enum" AS ENUM('skill', 'issue');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"password" text NOT NULL,
	"role" "account_role_enum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "account_nim_unique" UNIQUE("nim")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"email" text,
	"full_name" text,
	"birth_date" date,
	"phone_number" text,
	"id_line" text,
	"id_discord" text,
	"id_instagram" text,
	"fakultas" text,
	"prodi" text,
	"kelompok" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_nim_unique" UNIQUE("nim"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "handbook" (
	"media_id" text PRIMARY KEY NOT NULL,
	"title" text
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"creator_id" text NOT NULL,
	"name" text NOT NULL,
	"bucket" "media_bucket_enum" DEFAULT 'other' NOT NULL,
	"type" text NOT NULL,
	"url" text NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_name_unique" UNIQUE("name")
);
--> statement-breakpoint
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
	"deadline_date" timestamp with time zone,
	"quiz_weight" real DEFAULT 1 NOT NULL,
	"roleplay_weight" real DEFAULT 0 NOT NULL,
	"lgd_weight" real DEFAULT 0 NOT NULL,
	"stage_weight" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_extended_score" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"stage_id" serial NOT NULL,
	"stage_number" integer NOT NULL,
	"roleplay_score" integer,
	"lgd_score" integer
);
--> statement-breakpoint
CREATE TABLE "user_stage_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"stage_id" serial NOT NULL,
	"status" "user_stage_progress_enum" DEFAULT 'in_progress' NOT NULL,
	"completed_at" timestamp,
	"quiz_score" integer,
	"updated_at" timestamp,
	CONSTRAINT "user_stage_unique" UNIQUE("user_id","stage_id")
);
--> statement-breakpoint
CREATE TABLE "kelas" (
	"id_kelas" text PRIMARY KEY NOT NULL,
	"kuota" integer NOT NULL,
	"judul" text NOT NULL,
	"deskripsi" text NOT NULL,
	"pembicara" text NOT NULL,
	"type" "kelas_type_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pemilihan_kelas" (
	"user_id" text NOT NULL,
	"kelas_id" text NOT NULL,
	"waktu" timestamp DEFAULT now() NOT NULL,
	"prioritas" integer NOT NULL,
	"link_zoom" text
);
--> statement-breakpoint
CREATE TABLE "peserta_kelas" (
	"user_id" text NOT NULL,
	"kelas_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_submitted_kelas" (
	"user_id" text NOT NULL,
	"submitted" boolean DEFAULT false NOT NULL,
	"waktu" timestamp,
	"type" "kelas_type_enum" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_account_id_fk" FOREIGN KEY ("id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "handbook" ADD CONSTRAINT "handbook_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_option" ADD CONSTRAINT "answer_option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dialog" ADD CONSTRAINT "dialog_material_id_material_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."material"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "material" ADD CONSTRAINT "material_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_extended_score" ADD CONSTRAINT "user_extended_score_id_user_stage_progress_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user_stage_progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_extended_score" ADD CONSTRAINT "user_extended_score_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_extended_score" ADD CONSTRAINT "user_extended_score_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pemilihan_kelas" ADD CONSTRAINT "pemilihan_kelas_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pemilihan_kelas" ADD CONSTRAINT "pemilihan_kelas_kelas_id_kelas_id_kelas_fk" FOREIGN KEY ("kelas_id") REFERENCES "public"."kelas"("id_kelas") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_kelas" ADD CONSTRAINT "peserta_kelas_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_kelas" ADD CONSTRAINT "peserta_kelas_kelas_id_kelas_id_kelas_fk" FOREIGN KEY ("kelas_id") REFERENCES "public"."kelas"("id_kelas") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_submitted_kelas" ADD CONSTRAINT "user_submitted_kelas_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."user_stage_recaps" AS (
  WITH user_scores AS (
    SELECT
      u.id AS user_id,
      u.nim,
      u.full_name,
      u.kelompok,
      u.fakultas,
      u.prodi,

      usp1.quiz_score AS quiz_1,
      ues1.roleplay_score AS roleplay_1,
      ues1.lgd_score AS lgd_1,

      usp2.quiz_score AS quiz_2,
      ues2.roleplay_score AS roleplay_2,
      ues2.lgd_score AS lgd_2,

      usp3.quiz_score AS quiz_3,
      ues3.roleplay_score AS roleplay_3,
      ues3.lgd_score AS lgd_3,

      usp4.quiz_score AS quiz_4,
      ues4.roleplay_score AS roleplay_4,
      ues4.lgd_score AS lgd_4,

      usp5.quiz_score AS quiz_5,
      ues5.roleplay_score AS roleplay_5,
      ues5.lgd_score AS lgd_5,

      COALESCE(usp1.quiz_score, 0) +
      COALESCE(usp2.quiz_score, 0) +
      COALESCE(usp3.quiz_score, 0) +
      COALESCE(usp4.quiz_score, 0) +
      COALESCE(usp5.quiz_score, 0) AS total_quiz_score,

      COALESCE(ues1.roleplay_score, 0) +
      COALESCE(ues2.roleplay_score, 0) +
      COALESCE(ues3.roleplay_score, 0) +
      COALESCE(ues4.roleplay_score, 0) +
      COALESCE(ues5.roleplay_score, 0) AS total_roleplay_score,

      COALESCE(ues1.lgd_score, 0) +
      COALESCE(ues2.lgd_score, 0) +
      COALESCE(ues3.lgd_score, 0) +
      COALESCE(ues4.lgd_score, 0) +
      COALESCE(ues5.lgd_score, 0) AS total_lgd_score,

      (
        COALESCE(usp1.quiz_score, 0) * s1.quiz_weight +
        COALESCE(ues1.roleplay_score, 0) * s1.roleplay_weight +
        COALESCE(ues1.lgd_score, 0) * s1.lgd_weight
      ) * s1.stage_weight +
      (
        COALESCE(usp2.quiz_score, 0) * s2.quiz_weight +
        COALESCE(ues2.roleplay_score, 0) * s2.roleplay_weight +
        COALESCE(ues2.lgd_score, 0) * s2.lgd_weight
      ) * s2.stage_weight +
      (
        COALESCE(usp3.quiz_score, 0) * s3.quiz_weight +
        COALESCE(ues3.roleplay_score, 0) * s3.roleplay_weight +
        COALESCE(ues3.lgd_score, 0) * s3.lgd_weight
      ) * s3.stage_weight +
      (
        COALESCE(usp4.quiz_score, 0) * s4.quiz_weight +
        COALESCE(ues4.roleplay_score, 0) * s4.roleplay_weight +
        COALESCE(ues4.lgd_score, 0) * s4.lgd_weight
      ) * s4.stage_weight +
      (
        COALESCE(usp5.quiz_score, 0) * s5.quiz_weight +
        COALESCE(ues5.roleplay_score, 0) * s5.roleplay_weight +
        COALESCE(ues5.lgd_score, 0) * s5.lgd_weight
      ) * s5.stage_weight AS total_score,

      GREATEST(
        COALESCE(usp1.updated_at, '1970-01-01'::timestamp),
        COALESCE(usp2.updated_at, '1970-01-01'::timestamp),
        COALESCE(usp3.updated_at, '1970-01-01'::timestamp),
        COALESCE(usp4.updated_at, '1970-01-01'::timestamp),
        COALESCE(usp5.updated_at, '1970-01-01'::timestamp)
      ) AS completed_at

    FROM "user" u

    JOIN user_stage_progress usp1 ON usp1.user_id = u.id
    LEFT JOIN user_extended_score ues1 ON ues1.id = usp1.id
    JOIN stage s1 ON s1.id = usp1.stage_id AND s1.stage_number = 1

    JOIN user_stage_progress usp2 ON usp2.user_id = u.id
    LEFT JOIN user_extended_score ues2 ON ues2.id = usp2.id
    JOIN stage s2 ON s2.id = usp2.stage_id AND s2.stage_number = 2

    JOIN user_stage_progress usp3 ON usp3.user_id = u.id
    LEFT JOIN user_extended_score ues3 ON ues3.id = usp3.id
    JOIN stage s3 ON s3.id = usp3.stage_id AND s3.stage_number = 3

    JOIN user_stage_progress usp4 ON usp4.user_id = u.id
    LEFT JOIN user_extended_score ues4 ON ues4.id = usp4.id
    JOIN stage s4 ON s4.id = usp4.stage_id AND s4.stage_number = 4

    JOIN user_stage_progress usp5 ON usp5.user_id = u.id
    LEFT JOIN user_extended_score ues5 ON ues5.id = usp5.id
    JOIN stage s5 ON s5.id = usp5.stage_id AND s5.stage_number = 5
  )
  SELECT 
    *,
    ROW_NUMBER() OVER (ORDER BY total_quiz_score DESC, completed_at ASC) as rank
  FROM user_scores
  ORDER BY total_quiz_score DESC, completed_at ASC
);