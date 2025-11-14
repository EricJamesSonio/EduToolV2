// server/src/database/seeds/seed_teacher.js
import bcrypt from "bcryptjs";

/**
 * Seed the teacher table with a default teacher
 * @param {import('mysql2/promise').Pool} pool
 */
export async function seedTeacher(pool) {
  try {
    const plainPassword = "password123"; // default password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const query = `
      INSERT INTO teacher (name, email, password_hash)
      VALUES ('Demo Teacher', 'demo@edutool.com', ?)
    `;

    await pool.query(query, [hashedPassword]);
    console.log("✔ Seed Teacher inserted");
  } catch (err) {
    console.error("❌ Error seeding Teacher:", err.sqlMessage || err);
    process.exit(1);
  }
}
