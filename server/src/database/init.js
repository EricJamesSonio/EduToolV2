import mysql from 'mysql2/promise';
import { db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';

// ===== TABLES =====
import { teacherTable } from "./models/teacher.js";
import { studentsTable } from "./models/students.js";
import { gradingSettingsTable } from "./models/grading_settings.js";
import { assessmentsTable } from "./models/assessments.js";
import { assessmentItemsTable } from "./models/assessment_items.js";
import { assessmentSubmissionsTable } from "./models/assessment_submissions.js";
import { assessmentAnswersTable } from "./models/assessment_answers.js";
import { attendanceTable } from "./models/attendance.js";
import { behaviorScoresTable } from "./models/behavior_scores.js";
import { finalGradesTable } from "./models/final_grades.js";
import { semesterTable } from "./models/semester.js";
import { scheduleVersionsTable } from "./models/schedule_versions.js";
import { scheduleEntriesTable } from "./models/schedule_entries.js";
import { lessonPlansTable } from "./models/lesson_plans.js";
import { lessonPlanEntriesTable } from "./models/lesson_plan_entries.js";

// ===== NEW ASSESSMENT TABLES =====
import { assessmentAccessLinksTable } from "./models/assessment_access_links.js";
import { assessmentItemOptionsTable } from "./models/assessment_item_options.js";
import { assessmentStudentAccessTable } from "./models/assessment_student_access.js";

// ===== SEEDS =====
import { seedStudents } from "./seeds/seed_students.js";
import { seedGradingSettings } from "./seeds/seed_grading_settings.js";
import { seedSemesters } from "./seeds/seed_semesters.js";
import { seedAssessments } from "./seeds/seed_assessments.js";

const DB_NAME = process.env.DB_NAME;

// ----- TABLES IN ORDER -----
const tables = [
  teacherTable,
  studentsTable,
  gradingSettingsTable,
  semesterTable,
  assessmentsTable,
  assessmentItemsTable,
  assessmentSubmissionsTable,
  assessmentAnswersTable,
  assessmentAccessLinksTable,       // NEW
  assessmentItemOptionsTable,       // NEW
  assessmentStudentAccessTable,     // NEW
  attendanceTable,
  behaviorScoresTable,
  finalGradesTable,
  scheduleVersionsTable,
  scheduleEntriesTable,
  lessonPlansTable,
  lessonPlanEntriesTable
];

// ----- SEEDS IN ORDER -----
const seeds = [
  seedStudents,
  seedGradingSettings,
  seedSemesters,
  seedAssessments
];

/**
 * Strict SQL runner — stops script on error (for tables / critical ops)
 */
async function runStrict(pool, query, label) {
  try {
    await pool.query(query);
    console.log(`✔ ${label}`);
  } catch (err) {
    console.error(`❌ FAILED: ${label}`);
    console.error(err.sqlMessage || err);
    process.exit(1);
  }
}

/**
 * Safe SQL runner — logs errors but continues (for seeds)
 */
async function runSafe(pool, query, label) {
  try {
    await pool.query(query);
    console.log(`🌱 ${label}`);
  } catch (err) {
    console.warn(`⚠ Skipped seed (${label}): ${err.sqlMessage || err}`);
  }
}

async function init() {
  console.log("\n🚀 INITIALIZING DATABASE...\n");

  // Create DB if needed
  const tempPool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 1
  });

  await runStrict(
    tempPool,
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`,
    `Database '${DB_NAME}' ensured`
  );

  await tempPool.end();

  // Create tables
  console.log("\n📌 Creating tables...");
  for (let i = 0; i < tables.length; i++) {
    await runStrict(db, tables[i], `Table ${i + 1} created`);
  }

  // Seed teacher (skip if exists)
  console.log("\n👨‍🏫 Seeding teacher...");

  const [existing] = await db.query(
    "SELECT id FROM teacher WHERE email = 'demo@edutool.com'"
  );

  if (existing.length === 0) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await runSafe(
      db,
      `
      INSERT INTO teacher (name, email, password_hash)
      VALUES ('Demo Teacher', 'demo@edutool.com', '${hashedPassword}')
    `,
      "Inserted teacher"
    );
  } else {
    console.log("⚠ Teacher already exists — skipping");
  }

  // Seeds (safe mode)
  console.log("\n🌱 Running seeds...");

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];

    if (Array.isArray(seed)) {
      // Multiple SQL queries
      for (let j = 0; j < seed.length; j++) {
        await runSafe(db, seed[j], `Seed ${i + 1}.${j + 1}`);
      }
    } else {
      // Single SQL query
      await runSafe(db, seed, `Seed ${i + 1}`);
    }
  }

  console.log("\n🎉 DATABASE SETUP COMPLETE (safe mode)!");
  process.exit(0);
}

init();
