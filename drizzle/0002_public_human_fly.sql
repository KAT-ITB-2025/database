CREATE TABLE "announcement" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"divisi_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "divisi" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"link_group" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_divisi_id_divisi_id_fk" FOREIGN KEY ("divisi_id") REFERENCES "public"."divisi"("id") ON DELETE cascade ON UPDATE no action;