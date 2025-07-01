import { pgMaterializedView, real, text, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const userStageRecaps = pgMaterializedView('user_stage_recaps', {
  userId: text('user_id').primaryKey(),
  nim: text('nim'),
  fullName: text('full_name'),
  kelompok: text('kelompok'),
  fakultas: text('fakultas'),
  prodi: text('prodi'),

  quiz1: integer('quiz_1'),
  roleplay1: integer('roleplay_1'),
  lgd1: integer('lgd_1'),

  quiz2: integer('quiz_2'),
  roleplay2: integer('roleplay_2'),
  lgd2: integer('lgd_2'),

  quiz3: integer('quiz_3'),
  roleplay3: integer('roleplay_3'),
  lgd3: integer('lgd_3'),

  quiz4: integer('quiz_4'),
  roleplay4: integer('roleplay_4'),
  lgd4: integer('lgd_4'),

  quiz5: integer('quiz_5'),
  roleplay5: integer('roleplay_5'),
  lgd5: integer('lgd_5'),

  totalQuizScore: integer('total_quiz_score'),
  totalRoleplayScore: integer('total_roleplay_score'),
  totalLgdScore: integer('total_lgd_score'),
  totalScore: real('total_score'),
}).as(sql`
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
    ) * s5.stage_weight AS total_score

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
`);
