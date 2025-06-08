DO $$ BEGIN
 CREATE TYPE "public"."account_role_enum" AS ENUM('admin', 'mamet', 'mentor', 'user', 'guest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."media_bucket_enum" AS ENUM('core', 'oskm', 'dikpus', 'profile', 'submission-dikpus', 'submission-oskm', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"password" text NOT NULL,
	"role" "account_role_enum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "account_nim_unique" UNIQUE("nim")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"email" text,
	"full_name" text,
	"birth_date" date,
	"phone_number" text,
	"id_line" text,
	"id_discord" text,
	"id_instagram" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_nim_unique" UNIQUE("nim"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
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
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_id_account_id_fk" FOREIGN KEY ("id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
