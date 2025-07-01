'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var S=cuid2.init({length:8}),l=()=>new Date;var $=pgCore.pgEnum("account_role_enum",["admin","mamet","mentor","user","guest"]),y=pgCore.pgTable("account",{id:pgCore.text("id").primaryKey(),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:$("role").default("user").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)}),le=drizzleOrm.relations(y,({one:e})=>({user:e(r,{fields:[y.id],references:[r.id]})}));var r=pgCore.pgTable("user",{id:pgCore.text("id").primaryKey().references(()=>y.id),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),fullName:pgCore.text("full_name"),birthDate:pgCore.date("birth_date"),phoneNumber:pgCore.text("phone_number"),idLine:pgCore.text("id_line"),idDiscord:pgCore.text("id_discord"),idInstagram:pgCore.text("id_instagram"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),kelompok:pgCore.text("kelompok"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)});var v=pgCore.pgEnum("media_bucket_enum",["core","oskm","dikpus","profile","submission-dikpus","submission-oskm","other"]),w=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(S),creatorId:pgCore.text("creator_id").references(()=>r.id,{onDelete:"cascade"}).notNull(),name:pgCore.text("name").unique().notNull(),bucket:v("bucket").notNull().default("other"),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at",{withTimezone:true}).notNull().$onUpdate(l),createdAt:pgCore.timestamp("created_at",{withTimezone:true}).notNull().defaultNow()}),b=pgCore.pgTable("handbook",{mediaId:pgCore.text("media_id").primaryKey().references(()=>w.id),title:pgCore.text("title")}),Ne=drizzleOrm.relations(w,({one:e})=>({handbook:e(b,{fields:[w.id],references:[b.mediaId]})}));var G=pgCore.pgEnum("user_stage_progress_enum",["completed","in_progress","locked"]),i=pgCore.pgTable("stage",{id:pgCore.serial("id").primaryKey(),stageNumber:pgCore.integer("stage_number").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),availableDate:pgCore.timestamp("available_date",{mode:"date",withTimezone:true}),deadlineDate:pgCore.timestamp("deadline_date",{mode:"date",withTimezone:true}),quizWeight:pgCore.real("quiz_weight").default(1).notNull(),roleplayWeight:pgCore.real("roleplay_weight").default(0).notNull(),lgdWeight:pgCore.real("lgd_weight").default(0).notNull(),stageWeight:pgCore.real("stage_weight").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)}),x=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey(),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),status:G("status").default("in_progress").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(l)},e=>[pgCore.unique("user_stage_unique").on(e.userId,e.stageId)]),we=pgCore.pgTable("user_extended_score",{id:pgCore.text("id").primaryKey().references(()=>x.id),userId:pgCore.text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),stageNumber:pgCore.integer("stage_number").notNull(),roleplayScore:pgCore.integer("roleplay_score"),lgdScore:pgCore.integer("lgd_score")}),m=pgCore.pgTable("material",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"}),profile:pgCore.text("profile")}),z=pgCore.pgTable("dialog",{id:pgCore.serial("id").primaryKey(),materialId:pgCore.serial("material_id").references(()=>m.id,{onDelete:"cascade"}),content:pgCore.text("content"),order:pgCore.integer("order").notNull()}),f=pgCore.pgTable("quiz",{id:pgCore.serial("id").primaryKey(),stageId:pgCore.serial("stage_id").references(()=>i.id,{onDelete:"cascade"})}),c=pgCore.pgTable("question",{id:pgCore.serial("id").primaryKey(),quizId:pgCore.serial("quiz_id").references(()=>f.id,{onDelete:"cascade"}),question:pgCore.text("question").notNull(),order:pgCore.integer("order").notNull()}),A=pgCore.pgTable("answer_option",{id:pgCore.serial("id").primaryKey(),questionId:pgCore.serial("question_id").references(()=>c.id),option:pgCore.text("option").notNull(),optionStatus:pgCore.boolean("option_status").notNull()}),ze=drizzleOrm.relations(i,({many:e})=>({userStageProgresses:e(x),materials:e(m),quizzes:e(f)})),Ae=drizzleOrm.relations(x,({one:e})=>({stage:e(i,{fields:[x.stageId],references:[i.id]})})),Ee=drizzleOrm.relations(f,({one:e,many:k})=>({questions:k(c),stage:e(i,{fields:[f.stageId],references:[i.id]})})),Se=drizzleOrm.relations(c,({one:e})=>({quiz:e(f,{fields:[c.quizId],references:[f.id]})})),he=drizzleOrm.relations(c,({many:e})=>({answerOptions:e(A)})),Ie=drizzleOrm.relations(A,({one:e})=>({question:e(c,{fields:[A.questionId],references:[c.id]})})),Ce=drizzleOrm.relations(m,({one:e,many:k})=>({dialogs:k(z),stage:e(i,{fields:[m.stageId],references:[i.id]})})),be=drizzleOrm.relations(z,({one:e})=>({material:e(m,{fields:[z.materialId],references:[m.id]})}));var X=pgCore.pgEnum("kelas_type_enum",["skill","issue"]),T=pgCore.pgTable("kelas",{id_kelas:pgCore.text("id_kelas").primaryKey(),kuota:pgCore.integer("kuota").notNull(),judul:pgCore.text("judul").notNull(),deskripsi:pgCore.text("deskripsi").notNull(),pembicara:pgCore.text("pembicara").notNull(),type:X("type").notNull()}),Ke=pgCore.pgTable("pemilihan_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>T.id_kelas,{onDelete:"cascade"}),waktu:pgCore.timestamp("waktu").defaultNow().notNull(),prioritas:pgCore.integer("prioritas").notNull()}),Re=pgCore.pgTable("peserta_kelas",{user_id:pgCore.text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:pgCore.text("kelas_id").notNull().references(()=>T.id_kelas,{onDelete:"cascade"})});var We=pgCore.pgMaterializedView("user_stage_recaps",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),kelompok:pgCore.text("kelompok"),fakultas:pgCore.text("fakultas"),prodi:pgCore.text("prodi"),quiz1:pgCore.integer("quiz_1"),roleplay1:pgCore.integer("roleplay_1"),lgd1:pgCore.integer("lgd_1"),quiz2:pgCore.integer("quiz_2"),roleplay2:pgCore.integer("roleplay_2"),lgd2:pgCore.integer("lgd_2"),quiz3:pgCore.integer("quiz_3"),roleplay3:pgCore.integer("roleplay_3"),lgd3:pgCore.integer("lgd_3"),quiz4:pgCore.integer("quiz_4"),roleplay4:pgCore.integer("roleplay_4"),lgd4:pgCore.integer("lgd_4"),quiz5:pgCore.integer("quiz_5"),roleplay5:pgCore.integer("roleplay_5"),lgd5:pgCore.integer("lgd_5"),totalScore:pgCore.real("total_score")}).as(drizzleOrm.sql`
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
    ) * s5.stage_weight AS total_score

  FROM "user" u

  JOIN user_stage_progress usp1 ON usp1.user_id = u.id AND usp1.stage_id = 1
  LEFT JOIN user_extended_score ues1 ON ues1.id = usp1.id
  JOIN stage s1 ON s1.id = usp1.stage_id

  JOIN user_stage_progress usp2 ON usp2.user_id = u.id AND usp2.stage_id = 2
  LEFT JOIN user_extended_score ues2 ON ues2.id = usp2.id
  JOIN stage s2 ON s2.id = usp2.stage_id

  JOIN user_stage_progress usp3 ON usp3.user_id = u.id AND usp3.stage_id = 3
  LEFT JOIN user_extended_score ues3 ON ues3.id = usp3.id
  JOIN stage s3 ON s3.id = usp3.stage_id

  JOIN user_stage_progress usp4 ON usp4.user_id = u.id AND usp4.stage_id = 4
  LEFT JOIN user_extended_score ues4 ON ues4.id = usp4.id
  JOIN stage s4 ON s4.id = usp4.stage_id

  JOIN user_stage_progress usp5 ON usp5.user_id = u.id AND usp5.stage_id = 5
  LEFT JOIN user_extended_score ues5 ON ues5.id = usp5.id
  JOIN stage s5 ON s5.id = usp5.stage_id
`);exports.account=y;exports.accountRelation=le;exports.accountRoleEnum=$;exports.answerOption=A;exports.answerOptionRelation=Ie;exports.dialog=z;exports.dialogRelation=be;exports.handbook=b;exports.kelas=T;exports.kelasTypeEnum=X;exports.material=m;exports.materialRelation=Ce;exports.media=w;exports.mediaBucketEnum=v;exports.mediaRelation=Ne;exports.pemilihan_kelas=Ke;exports.peserta_kelas=Re;exports.question=c;exports.questionRelation=he;exports.questionsRelation=Se;exports.quiz=f;exports.quizRelation=Ee;exports.stage=i;exports.stageRelation=ze;exports.user=r;exports.userExtendedScore=we;exports.userStageProgress=x;exports.userStageProgressRelation=Ae;exports.userStageProgressStatusEnum=G;exports.userStageRecaps=We;