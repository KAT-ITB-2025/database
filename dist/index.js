import {pgEnum,pgTable,timestamp,text,date,real,integer,serial,unique,boolean,pgMaterializedView}from'drizzle-orm/pg-core';import {init}from'@paralleldrive/cuid2';import {relations,sql}from'drizzle-orm';var x=init({length:8}),l=()=>new Date;var U=pgEnum("account_role_enum",["admin","mamet","mentor","user","guest"]),f=pgTable("account",{id:text("id").primaryKey(),nim:text("nim").notNull().unique(),password:text("password").notNull(),role:U("role").default("user").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(l)}),ue=relations(f,({one:e})=>({user:e(r,{fields:[f.id],references:[r.id]})}));var r=pgTable("user",{id:text("id").primaryKey().references(()=>f.id),nim:text("nim").notNull().unique(),email:text("email").unique(),fullName:text("full_name"),birthDate:date("birth_date"),phoneNumber:text("phone_number"),idLine:text("id_line"),idDiscord:text("id_discord"),idInstagram:text("id_instagram"),fakultas:text("fakultas"),prodi:text("prodi"),kelompok:text("kelompok"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(l)});var P=pgEnum("media_bucket_enum",["core","oskm","dikpus","profile","submission-dikpus","submission-oskm","other"]),O=pgTable("media",{id:text("id").primaryKey().$defaultFn(x),creatorId:text("creator_id").references(()=>r.id,{onDelete:"cascade"}).notNull(),name:text("name").unique().notNull(),bucket:P("bucket").notNull().default("other"),type:text("type").notNull(),url:text("url").notNull(),updatedAt:timestamp("updated_at",{withTimezone:true}).notNull().$onUpdate(l),createdAt:timestamp("created_at",{withTimezone:true}).notNull().defaultNow()}),I=pgTable("handbook",{mediaId:text("media_id").primaryKey().references(()=>O.id),title:text("title")}),fe=relations(O,({one:e})=>({handbook:e(I,{fields:[O.id],references:[I.mediaId]})}));var Y=pgEnum("user_stage_progress_enum",["completed","in_progress","locked"]),a=pgTable("stage",{id:serial("id").primaryKey(),stageNumber:integer("stage_number").notNull(),title:text("title").notNull(),description:text("description"),availableDate:timestamp("available_date",{mode:"date",withTimezone:true}),deadlineDate:timestamp("deadline_date",{mode:"date",withTimezone:true}),quizWeight:real("quiz_weight").default(1).notNull(),roleplayWeight:real("roleplay_weight").default(0).notNull(),lgdWeight:real("lgd_weight").default(0).notNull(),stageWeight:real("stage_weight").default(0).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(l)}),A=pgTable("user_stage_progress",{id:text("id").primaryKey(),userId:text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:serial("stage_id").references(()=>a.id,{onDelete:"cascade"}),status:Y("status").default("in_progress").notNull(),completedAt:timestamp("completed_at"),quizScore:integer("quiz_score"),updatedAt:timestamp("updated_at").$onUpdate(l)},e=>[unique("user_stage_unique").on(e.userId,e.stageId)]),qe=pgTable("user_extended_score",{id:text("id").primaryKey().references(()=>A.id),userId:text("user_id").references(()=>r.id,{onDelete:"cascade"}),stageId:serial("stage_id").references(()=>a.id,{onDelete:"cascade"}),stageNumber:integer("stage_number").notNull(),roleplayScore:integer("roleplay_score"),lgdScore:integer("lgd_score")}),g=pgTable("material",{id:serial("id").primaryKey(),stageId:serial("stage_id").references(()=>a.id,{onDelete:"cascade"}),profile:text("profile")}),q=pgTable("dialog",{id:serial("id").primaryKey(),materialId:serial("material_id").references(()=>g.id,{onDelete:"cascade"}),content:text("content"),order:integer("order").notNull()}),E=pgTable("quiz",{id:serial("id").primaryKey(),stageId:serial("stage_id").references(()=>a.id,{onDelete:"cascade"})}),c=pgTable("question",{id:serial("id").primaryKey(),quizId:serial("quiz_id").references(()=>E.id,{onDelete:"cascade"}),question:text("question").notNull(),order:integer("order").notNull()}),z=pgTable("answer_option",{id:serial("id").primaryKey(),questionId:serial("question_id").references(()=>c.id),option:text("option").notNull(),optionStatus:boolean("option_status").notNull()}),ze=relations(a,({many:e})=>({userStageProgresses:e(A),materials:e(g),quizzes:e(E)})),ke=relations(A,({one:e})=>({stage:e(a,{fields:[A.stageId],references:[a.id]})})),xe=relations(E,({one:e,many:C})=>({questions:C(c),stage:e(a,{fields:[E.stageId],references:[a.id]})})),we=relations(c,({one:e})=>({quiz:e(E,{fields:[c.quizId],references:[E.id]})})),he=relations(c,({many:e})=>({answerOptions:e(z)})),Le=relations(z,({one:e})=>({question:e(c,{fields:[z.questionId],references:[c.id]})})),Ie=relations(g,({one:e,many:C})=>({dialogs:C(q),stage:e(a,{fields:[g.stageId],references:[a.id]})})),be=relations(q,({one:e})=>({material:e(g,{fields:[q.materialId],references:[g.id]})}));var Q=pgEnum("kelas_type_enum",["skill","issue"]),R=pgTable("kelas",{id_kelas:text("id_kelas").primaryKey(),kuota:integer("kuota").notNull(),judul:text("judul").notNull(),deskripsi:text("deskripsi").notNull(),pembicara:text("pembicara").notNull(),type:Q("type").notNull()}),Ke=pgTable("pemilihan_kelas",{user_id:text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:text("kelas_id").notNull().references(()=>R.id_kelas,{onDelete:"cascade"}),waktu:timestamp("waktu").defaultNow().notNull(),prioritas:integer("prioritas").notNull()}),Fe=pgTable("peserta_kelas",{user_id:text("user_id").notNull().references(()=>r.id,{onDelete:"cascade"}),kelas_id:text("kelas_id").notNull().references(()=>R.id_kelas,{onDelete:"cascade"})});var Be=pgMaterializedView("user_stage_recaps",{userId:text("user_id").primaryKey(),nim:text("nim"),fullName:text("full_name"),kelompok:text("kelompok"),fakultas:text("fakultas"),prodi:text("prodi"),quiz1:integer("quiz_1"),roleplay1:integer("roleplay_1"),lgd1:integer("lgd_1"),quiz2:integer("quiz_2"),roleplay2:integer("roleplay_2"),lgd2:integer("lgd_2"),quiz3:integer("quiz_3"),roleplay3:integer("roleplay_3"),lgd3:integer("lgd_3"),quiz4:integer("quiz_4"),roleplay4:integer("roleplay_4"),lgd4:integer("lgd_4"),quiz5:integer("quiz_5"),roleplay5:integer("roleplay_5"),lgd5:integer("lgd_5"),totalQuizScore:integer("total_quiz_score"),totalRoleplayScore:integer("total_roleplay_score"),totalLgdScore:integer("total_lgd_score"),totalScore:real("total_score"),rank:integer("rank"),completedAt:timestamp("completed_at")}).as(sql`
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
`);export{f as account,ue as accountRelation,U as accountRoleEnum,z as answerOption,Le as answerOptionRelation,q as dialog,be as dialogRelation,I as handbook,R as kelas,Q as kelasTypeEnum,g as material,Ie as materialRelation,O as media,P as mediaBucketEnum,fe as mediaRelation,Ke as pemilihan_kelas,Fe as peserta_kelas,c as question,he as questionRelation,we as questionsRelation,E as quiz,xe as quizRelation,a as stage,ze as stageRelation,r as user,qe as userExtendedScore,A as userStageProgress,ke as userStageProgressRelation,Y as userStageProgressStatusEnum,Be as userStageRecaps};