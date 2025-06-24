CREATE TABLE "kelas" (
	"id_kelas" text PRIMARY KEY NOT NULL,
	"kuota" integer NOT NULL,
	"judul" text NOT NULL,
	"deskripsi" text NOT NULL,
	"pembicara" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pemilihan_kelas" (
	"user_id" text NOT NULL,
	"kelas_id" text NOT NULL,
	"waktu" timestamp DEFAULT now() NOT NULL,
	"prioritas" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "peserta_kelas" (
	"user_id" text NOT NULL,
	"kelas_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nilai_pendikpus" (
	"user_id" text NOT NULL,
	"pendikpus_id" text NOT NULL,
	"nilai" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pemilihan_kelas" ADD CONSTRAINT "pemilihan_kelas_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pemilihan_kelas" ADD CONSTRAINT "pemilihan_kelas_kelas_id_kelas_id_kelas_fk" FOREIGN KEY ("kelas_id") REFERENCES "public"."kelas"("id_kelas") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_kelas" ADD CONSTRAINT "peserta_kelas_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_kelas" ADD CONSTRAINT "peserta_kelas_kelas_id_kelas_id_kelas_fk" FOREIGN KEY ("kelas_id") REFERENCES "public"."kelas"("id_kelas") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nilai_pendikpus" ADD CONSTRAINT "nilai_pendikpus_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nilai_pendikpus" ADD CONSTRAINT "nilai_pendikpus_pendikpus_id_user_id_fk" FOREIGN KEY ("pendikpus_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;