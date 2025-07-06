'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var w=cuid2.init({length:8}),u=()=>new Date;var B=pgCore.pgEnum("account_role_enum",["admin","mamet","mentor","user","guest"]),f=pgCore.pgTable("account",{id:pgCore.text("id").primaryKey(),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:B("role").default("user").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(u)}),ne=drizzleOrm.relations(f,({one:e})=>({user:e(r,{fields:[f.id],references:[r.id]})}));var r=pgCore.pgTable("user",{id:pgCore.text("id").primaryKey().references(()=>f.id),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),fullName:pgCore.text("full_name"),birthDate:pgCore.date("birth_date"),phoneNumber:pgCore.text("phone_number"),idLine:pgCore.text("id_line"),idDiscord:pgCore.text("id_discord"),idInstagram:pgCore.text("id_instagram"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),kelompok:pgCore.text("kelompok"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(u)});var V=pgCore.pgEnum("media_bucket_enum",["core","oskm","dikpus","profile","submission-dikpus","submission-oskm","other"]),q=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(w),creatorId:pgCore.text("creator_id").references(()=>r.id,{onDelete:"cascade"}).notNull(),name:pgCore.text("name").unique().notNull(),bucket:V("bucket").notNull().default("other"),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at",{withTimezone:true}).notNull().$onUpdate(u),createdAt:pgCore.timestamp("created_at",{withTimezone:true}).notNull().defaultNow()}),b=pgCore.pgTable("handbook",{mediaId:pgCore.text("media_id").primaryKey().references(()=>q.id),title:pgCore.text("title")}),Ae=drizzleOrm.relations(q,({one:e})=>({handbook:e(b,{fields:[q.id],references:[b.mediaId]})}));var Q=pgCore.pgEnum("user_stage_progress_enum",["completed","in_progress","locked"]),i=pgCore.pgTable("stage",{id:pgCore.serial("id").primaryKey(),stageNumber:pgCore.integer("stage_number").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),availableDate:pgCore.timestamp("available_date",{mode:"date",withTimezone:true}),deadlineDate:pgCore.timestamp("deadline_date",{mode:"date",withTimezone:true}),quizWeight:pgCore.real("quiz_weight").default(1).notNull(),roleplayWeight:pgCore.real("roleplay_weight").default(0).notNull(),lgdWeight:pgCore.real("lgd_weight").default(0).notNull(),stageWeight:pgCore.real("stage_weight").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(u)}),S=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey(),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),status:Q("status").default("in_progress").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(u)},e=>[pgCore.unique("user_stage_unique").on(e.userId,e.stageId)]),xe=pgCore.pgTable("user_extended_score",{id:pgCore.text("id").primaryKey().references(()=>S.id),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),stageNumber:pgCore.integer("stage_number").notNull(),roleplayScore:pgCore.integer("roleplay_score"),lgdScore:pgCore.integer("lgd_score")}),g=pgCore.pgTable("material",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),profile:pgCore.text("profile")}),k=pgCore.pgTable("dialog",{id:pgCore.serial("id").primaryKey(),materialId:pgCore.serial("material_id").references(()=>g.id,{onDelete:"cascade"}),content:pgCore.text("content"),order:pgCore.integer("order").notNull()}),E=pgCore.pgTable("quiz",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"})}),c=pgCore.pgTable("question",{id:pgCore.serial("id").primaryKey(),quizId:pgCore.serial("quiz_id").references(()=>E.id,{onDelete:"cascade"}),question:pgCore.text("question").notNull(),order:pgCore.integer("order").notNull()}),z=pgCore.pgTable("answer_option",{id:pgCore.serial("id").primaryKey(),questionId:pgCore.serial("question_id").references(()=>c.id),option:pgCore.text("option").notNull(),optionStatus:pgCore.boolean("option_status").notNull()}),we=drizzleOrm.relations(i,({many:e})=>({userStageProgresses:e(S),materials:e(g),quizzes:e(E)})),he=drizzleOrm.relations(S,({one:e})=>({stage:e(i,{fields:[S.stageId],references:[i.id]})})),Le=drizzleOrm.relations(E,({one:e,many:C})=>({questions:C(c),stage:e(i,{fields:[E.stageId],references:[i.id]})})),Ie=drizzleOrm.relations(c,({one:e})=>({quiz:e(E,{fields:[c.quizId],references:[E.id]})})),be=drizzleOrm.relations(c,({many:e})=>({answerOptions:e(z)})),De=drizzleOrm.relations(z,({one:e})=>({question:e(c,{fields:[z.questionId],references:[c.id]})})),Re=drizzleOrm.relations(g,({one:e,many:C})=>({dialogs:C(k),stage:e(i,{fields:[g.stageId],references:[i.id]})})),Te=drizzleOrm.relations(k,({one:e})=>({material:e(g,{fields:[k.materialId],references:[g.id]})}));var J=pgCore.pgEnum("kelas_type_enum",["skill","issue"]),K=pgCore.pgTable("kelas",{id_kelas:pgCore.text("id_kelas").primaryKey(),kuota:pgCore.integer("kuota").notNull(),judul:pgCore.text("judul").notNull(),deskripsi:pgCore.text("deskripsi").notNull(),pembicara:pgCore.text("pembicara").notNull(),type:J("type").notNull(),link_zoom:pgCore.text("link_zoom")}),We=pgCore.pgTable("pemilihan_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>K.id_kelas,{onDelete:"cascade"}),waktu:pgCore.timestamp("waktu").defaultNow().notNull(),prioritas:pgCore.integer("prioritas").notNull()}),$e=pgCore.pgTable("peserta_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>K.id_kelas,{onDelete:"cascade"})}),Be=pgCore.pgTable("user_submitted_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),submitted:pgCore.boolean("submitted").default(false).notNull(),waktu:pgCore.timestamp("waktu"),type:J("type").notNull()});var je=pgCore.pgTable("links",{id:pgCore.text("id").primaryKey(),link:pgCore.text("link").notNull(),type:pgCore.text("type").notNull()});var Ge=pgCore.pgMaterializedView("user_stage_recaps",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),kelompok:pgCore.text("kelompok"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),quiz1:pgCore.integer("quiz_1"),roleplay1:pgCore.integer("roleplay_1"),lgd1:pgCore.integer("lgd_1"),quiz2:pgCore.integer("quiz_2"),roleplay2:pgCore.integer("roleplay_2"),lgd2:pgCore.integer("lgd_2"),quiz3:pgCore.integer("quiz_3"),roleplay3:pgCore.integer("roleplay_3"),lgd3:pgCore.integer("lgd_3"),quiz4:pgCore.integer("quiz_4"),roleplay4:pgCore.integer("roleplay_4"),lgd4:pgCore.integer("lgd_4"),quiz5:pgCore.integer("quiz_5"),roleplay5:pgCore.integer("roleplay_5"),lgd5:pgCore.integer("lgd_5"),totalQuizScore:pgCore.integer("total_quiz_score"),totalRoleplayScore:pgCore.integer("total_roleplay_score"),totalLgdScore:pgCore.integer("total_lgd_score"),totalScore:pgCore.real("total_score"),rank:pgCore.integer("rank"),completedAt:pgCore.timestamp("completed_at")}).as(drizzleOrm.sql`
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
`);exports.account=f;exports.accountRelation=ne;exports.accountRoleEnum=B;exports.answerOption=z;exports.answerOptionRelation=De;exports.dialog=k;exports.dialogRelation=Te;exports.handbook=b;exports.kelas=K;exports.kelasTypeEnum=J;exports.links=je;exports.material=g;exports.materialRelation=Re;exports.media=q;exports.mediaBucketEnum=V;exports.mediaRelation=Ae;exports.pemilihan_kelas=We;exports.peserta_kelas=$e;exports.question=c;exports.questionRelation=be;exports.questionsRelation=Ie;exports.quiz=E;exports.quizRelation=Le;exports.stage=i;exports.stageRelation=we;exports.user=r;exports.userExtendedScore=xe;exports.userStageProgress=S;exports.userStageProgressRelation=he;exports.userStageProgressStatusEnum=Q;exports.userStageRecaps=Ge;exports.user_submitted_kelas=Be;