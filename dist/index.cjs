'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var x=cuid2.init({length:8}),l=()=>new Date;var $=pgCore.pgEnum("account_role_enum",["admin","mamet","mentor","user","guest"]),f=pgCore.pgTable("account",{id:pgCore.text("id").primaryKey(),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:$("role").default("user").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)}),ue=drizzleOrm.relations(f,({one:e})=>({user:e(r,{fields:[f.id],references:[r.id]})}));var r=pgCore.pgTable("user",{id:pgCore.text("id").primaryKey().references(()=>f.id),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),fullName:pgCore.text("full_name"),birthDate:pgCore.date("birth_date"),phoneNumber:pgCore.text("phone_number"),idLine:pgCore.text("id_line"),idDiscord:pgCore.text("id_discord"),idInstagram:pgCore.text("id_instagram"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),kelompok:pgCore.text("kelompok"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)});var M=pgCore.pgEnum("media_bucket_enum",["core","oskm","dikpus","profile","submission-dikpus","submission-oskm","other"]),O=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(x),creatorId:pgCore.text("creator_id").references(()=>r.id,{onDelete:"cascade"}).notNull(),name:pgCore.text("name").unique().notNull(),bucket:M("bucket").notNull().default("other"),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at",{withTimezone:true}).notNull().$onUpdate(l),createdAt:pgCore.timestamp("created_at",{withTimezone:true}).notNull().defaultNow()}),I=pgCore.pgTable("handbook",{mediaId:pgCore.text("media_id").primaryKey().references(()=>O.id),title:pgCore.text("title")}),fe=drizzleOrm.relations(O,({one:e})=>({handbook:e(I,{fields:[O.id],references:[I.mediaId]})}));var Y=pgCore.pgEnum("user_stage_progress_enum",["completed","in_progress","locked"]),i=pgCore.pgTable("stage",{id:pgCore.serial("id").primaryKey(),stageNumber:pgCore.integer("stage_number").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),availableDate:pgCore.timestamp("available_date",{mode:"date",withTimezone:true}),deadlineDate:pgCore.timestamp("deadline_date",{mode:"date",withTimezone:true}),quizWeight:pgCore.real("quiz_weight").default(1).notNull(),roleplayWeight:pgCore.real("roleplay_weight").default(0).notNull(),lgdWeight:pgCore.real("lgd_weight").default(0).notNull(),stageWeight:pgCore.real("stage_weight").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)}),A=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey(),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),status:Y("status").default("in_progress").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)},e=>[pgCore.unique("user_stage_unique").on(e.userId,e.stageId)]),qe=pgCore.pgTable("user_extended_score",{id:pgCore.text("id").primaryKey().references(()=>A.id),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),stageNumber:pgCore.integer("stage_number").notNull(),roleplayScore:pgCore.integer("roleplay_score"),lgdScore:pgCore.integer("lgd_score")}),m=pgCore.pgTable("material",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),profile:pgCore.text("profile")}),q=pgCore.pgTable("dialog",{id:pgCore.serial("id").primaryKey(),materialId:pgCore.serial("material_id").references(()=>m.id,{onDelete:"cascade"}),content:pgCore.text("content"),order:pgCore.integer("order").notNull()}),E=pgCore.pgTable("quiz",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"})}),c=pgCore.pgTable("question",{id:pgCore.serial("id").primaryKey(),quizId:pgCore.serial("quiz_id").references(()=>E.id,{onDelete:"cascade"}),question:pgCore.text("question").notNull(),order:pgCore.integer("order").notNull()}),z=pgCore.pgTable("answer_option",{id:pgCore.serial("id").primaryKey(),questionId:pgCore.serial("question_id").references(()=>c.id),option:pgCore.text("option").notNull(),optionStatus:pgCore.boolean("option_status").notNull()}),ze=drizzleOrm.relations(i,({many:e})=>({userStageProgresses:e(A),materials:e(m),quizzes:e(E)})),ke=drizzleOrm.relations(A,({one:e})=>({stage:e(i,{fields:[A.stageId],references:[i.id]})})),xe=drizzleOrm.relations(E,({one:e,many:y})=>({questions:y(c),stage:e(i,{fields:[E.stageId],references:[i.id]})})),we=drizzleOrm.relations(c,({one:e})=>({quiz:e(E,{fields:[c.quizId],references:[E.id]})})),he=drizzleOrm.relations(c,({many:e})=>({answerOptions:e(z)})),Le=drizzleOrm.relations(z,({one:e})=>({question:e(c,{fields:[z.questionId],references:[c.id]})})),Ie=drizzleOrm.relations(m,({one:e,many:y})=>({dialogs:y(q),stage:e(i,{fields:[m.stageId],references:[i.id]})})),be=drizzleOrm.relations(q,({one:e})=>({material:e(m,{fields:[q.materialId],references:[m.id]})}));var Q=pgCore.pgEnum("kelas_type_enum",["skill","issue"]),R=pgCore.pgTable("kelas",{id_kelas:pgCore.text("id_kelas").primaryKey(),kuota:pgCore.integer("kuota").notNull(),judul:pgCore.text("judul").notNull(),deskripsi:pgCore.text("deskripsi").notNull(),pembicara:pgCore.text("pembicara").notNull(),type:Q("type").notNull()}),Ke=pgCore.pgTable("pemilihan_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>R.id_kelas,{onDelete:"cascade"}),waktu:pgCore.timestamp("waktu").defaultNow().notNull(),prioritas:pgCore.integer("prioritas").notNull()}),Fe=pgCore.pgTable("peserta_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>R.id_kelas,{onDelete:"cascade"})});var Pe=pgCore.pgMaterializedView("user_stage_recaps",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),kelompok:pgCore.text("kelompok"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),quiz1:pgCore.integer("quiz_1"),roleplay1:pgCore.integer("roleplay_1"),lgd1:pgCore.integer("lgd_1"),quiz2:pgCore.integer("quiz_2"),roleplay2:pgCore.integer("roleplay_2"),lgd2:pgCore.integer("lgd_2"),quiz3:pgCore.integer("quiz_3"),roleplay3:pgCore.integer("roleplay_3"),lgd3:pgCore.integer("lgd_3"),quiz4:pgCore.integer("quiz_4"),roleplay4:pgCore.integer("roleplay_4"),lgd4:pgCore.integer("lgd_4"),quiz5:pgCore.integer("quiz_5"),roleplay5:pgCore.integer("roleplay_5"),lgd5:pgCore.integer("lgd_5"),totalQuizScore:pgCore.integer("total_quiz_score"),totalRoleplayScore:pgCore.integer("total_roleplay_score"),totalLgdScore:pgCore.integer("total_lgd_score"),totalScore:pgCore.real("total_score"),rank:pgCore.integer("rank"),completedAt:pgCore.timestamp("completed_at")}).as(drizzleOrm.sql`
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
    DENSE_RANK() OVER (ORDER BY total_quiz_score DESC) as rank
  FROM user_scores
  ORDER BY total_quiz_score DESC
`);exports.account=f;exports.accountRelation=ue;exports.accountRoleEnum=$;exports.answerOption=z;exports.answerOptionRelation=Le;exports.dialog=q;exports.dialogRelation=be;exports.handbook=I;exports.kelas=R;exports.kelasTypeEnum=Q;exports.material=m;exports.materialRelation=Ie;exports.media=O;exports.mediaBucketEnum=M;exports.mediaRelation=fe;exports.pemilihan_kelas=Ke;exports.peserta_kelas=Fe;exports.question=c;exports.questionRelation=he;exports.questionsRelation=we;exports.quiz=E;exports.quizRelation=xe;exports.stage=i;exports.stageRelation=ze;exports.user=r;exports.userExtendedScore=qe;exports.userStageProgress=A;exports.userStageProgressRelation=ke;exports.userStageProgressStatusEnum=Y;exports.userStageRecaps=Pe;