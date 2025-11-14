📚 EDUTOOL — Database Structure (Markdown Summary)

This document lists all tables and explains each with simple foreign key notes.

🧑‍🏫 1. teacher

Stores the single teacher account.

Columns

id (PK)

name

email

password_hash

No foreign keys.

🎒 2. students

Stores all students for this teacher.

Columns

id (PK)

first_name

last_name

student_number

class_section

No foreign keys.

📝 3. Assessments System
Table: assessments

Types: quiz, exam, activity, exercise.

Columns

id (PK)

title

description

type (ENUM)

date

No foreign keys.

Table: assessment_items

Questions for each assessment.

Columns

id (PK)

assessment_id (FK → assessments.id)

question

option_a / b / c / d

correct_answer

Table: assessment_submissions

One submission per student per assessment.

Columns

id (PK)

assessment_id (FK → assessments.id)

student_id (FK → students.id)

score

submitted_at

Table: assessment_answers

Each question answered inside a submission.

Columns

id (PK)

submission_id (FK → assessment_submissions.id)

item_id (FK → assessment_items.id)

chosen_answer

is_correct

🏫 4. Attendance

Auto-marked based on submissions but still editable.

Table: attendance

Columns

id (PK)

student_id (FK → students.id)

date

status (ENUM)

source (ENUM)

remarks

📊 5. Grading & Behavior
Table: grading_settings

Only one row.

Columns

id (PK)

exam_weight

activity_weight

quiz_weight

exercise_weight

behavior_weight

updated_at

No foreign keys.

Table: behavior_scores

Manual behavior entries.

Columns

id (PK)

student_id (FK → students.id)

score

date

remarks

Table: final_grades

Computed summary per period.

Columns

id (PK)

student_id (FK → students.id)

period

exam_grade

activity_grade

quiz_grade

exercise_grade

behavior_grade

final_grade

updated_at

📅 6. Weekly Schedule (Versioned)
Table: semester

Columns

id (PK)

name

start_date

end_date

No foreign keys.

Table: schedule_versions

Every edit = new version.

Columns

id (PK)

semester_id (FK → semester.id)

version_number

updated_at

Table: schedule_entries

Actual schedule rows.

Columns

id (PK)

version_id (FK → schedule_versions.id)

day_of_week

subject

start_time

end_time

room

📚 7. Lesson Planner
Table: lesson_plans

Weekly or monthly.

Columns

id (PK)

period_type (ENUM)

week_number

month

year

created_at

No foreign keys.

Table: lesson_plan_entries

Entries inside a lesson plan.

Columns

id (PK)

plan_id (FK → lesson_plans.id)

day_of_week

topic

content

materials

assessment_plan