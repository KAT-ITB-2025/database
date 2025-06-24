CREATE TABLE "nilai_pendikpus" (
	"user_id" integer NOT NULL,
	"pendikpus_id" integer NOT NULL,
	"nilai" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nilai_pendikpus" ADD CONSTRAINT "nilai_pendikpus_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nilai_pendikpus" ADD CONSTRAINT "nilai_pendikpus_pendikpus_id_user_id_fk" FOREIGN KEY ("pendikpus_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;