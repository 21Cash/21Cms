import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  date,
  smallint,
  doublePrecision,
  uuid,
  primaryKey,
  index,
  unique,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  userId: text("user_id").primaryKey(),
  username: text("username"),
  password: text("password").notNull(),
  lastRefreshed: timestamp("last_refresh", { mode: "date" }).notNull(),
});

// ─────────────────────────────────────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────────────────────────────────────
export const courses = pgTable("courses", {
  courseCode: text("course_code").primaryKey(),
  courseName: text("course_name"),
});

// ─────────────────────────────────────────────────────────────────────────────
// FULL ATTENDANCE INFOS
// ─────────────────────────────────────────────────────────────────────────────
export const fullAttendanceInfos = pgTable(
  "full_attendance_infos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.userId),
    date: date("date").notNull(), // According to IST
    totalClassesHeld: smallint("total_classes_held").notNull(),
    totalClassesPresent: smallint("total_classes_present").notNull(),
    attendancePercentage: doublePrecision("attendance_percent").notNull(),
  },
  (table) => [
    index("full_attendance_infos_user_date_idx").on(table.userId, table.date),
    unique("full_attendance_infos_user_date_unique").on(
      table.userId,
      table.date
    ),
  ]
);

// ─────────────────────────────────────────────────────────────────────────────
// COURSE ATTENDANCE INFOS
// ─────────────────────────────────────────────────────────────────────────────
export const courseAttendanceInfos = pgTable(
  "course_attendance_infos",
  {
    fullAttendanceInfoId: uuid("full_attendance_info_id")
      .notNull()
      .references(() => fullAttendanceInfos.id),
    courseCode: text("course_code")
      .notNull()
      .references(() => courses.courseCode),
    classesHeld: smallint("classes_held").notNull(),
    classesPresent: smallint("classes_present").notNull(),
    presentDelta: smallint("present_delta").notNull(),
    absentDelta: smallint("absent_delta").notNull(),
    courseAttendancePercentage: doublePrecision(
      "course_attendance_percentage"
    ).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.fullAttendanceInfoId, table.courseCode] }),
  ]
);

// ─────────────────────────────────────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  fullAttendanceInfos: many(fullAttendanceInfos),
}));

export const fullAttendanceInfosRelations = relations(
  fullAttendanceInfos,
  ({ one, many }) => ({
    user: one(users, {
      fields: [fullAttendanceInfos.userId],
      references: [users.userId],
    }),
    courseAttendanceInfos: many(courseAttendanceInfos),
  })
);

export const courseAttendanceInfosRelations = relations(
  courseAttendanceInfos,
  ({ one }) => ({
    fullAttendanceInfo: one(fullAttendanceInfos, {
      fields: [courseAttendanceInfos.fullAttendanceInfoId],
      references: [fullAttendanceInfos.id],
    }),
    course: one(courses, {
      fields: [courseAttendanceInfos.courseCode],
      references: [courses.courseCode],
    }),
  })
);
