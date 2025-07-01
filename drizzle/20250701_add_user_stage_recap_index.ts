import { sql } from 'drizzle-orm';

export default {
  async up(db: any) {
    await db.execute(sql`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_user_stage_recap_user_id
      ON user_stage_recap(user_id);
    `);
  },

  async down(db: any) {
    await db.execute(sql`
      DROP INDEX IF EXISTS idx_user_stage_recap_user_id;
    `);
  },
};
