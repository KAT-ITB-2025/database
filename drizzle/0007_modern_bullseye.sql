CREATE TABLE "reset_password_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text,
	"token_expiration" timestamp
);
--> statement-breakpoint
ALTER TABLE "reset_password_token" ADD CONSTRAINT "reset_password_token_id_account_id_fk" FOREIGN KEY ("id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;