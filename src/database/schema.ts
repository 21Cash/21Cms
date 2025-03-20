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
} from "drizzle-orm/pg-core";

// USERS
export const users = pgTable("users", {
  userId: text("user_id").primaryKey(),
  username: text("username"),
  password: text("password").notNull(),
  lastRefresh: timestamp("last_refresh", { withTimezone: true }),
});

// COURSES
export const courses = pgTable("courses", {
  courseCode: text("course_code").primaryKey(),
  courseName: text("course_name"),
});

// FULL ATTENDANCE INFOS
export const fullAttendanceInfos = pgTable(
  "full_attendance_infos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.userId),
    date: date("date").notNull(),
    totalClassesHeld: smallint("total_classes_held").notNull(),
    totalClassesPresent: smallint("total_classes_present").notNull(),
    attendancePercent: doublePrecision("attendance_percent").notNull(),
  },
  (table) => [
    index("full_attendance_infos_user_date_idx").on(table.userId, table.date),
  ]
);

// COURSE ATTENDANCE INFOS
export const courseAttendanceInfos = pgTable("course_attendance_infos", {
  attendanceInfoId: uuid("attendance_info_id").defaultRandom().primaryKey(),
  fullAttendanceId: uuid("full_attendance_id")
    .notNull()
    .references(() => fullAttendanceInfos.id),
  courseCode: text("course_code")
    .notNull()
    .references(() => courses.courseCode),
  classesHeld: smallint("classes_held").notNull(),
  classesPresent: smallint("classes_present").notNull(),
  courseAttendancePercentage: doublePrecision("course_attendance").notNull(),
});

// COURSE DELTA INFOS
export const courseDeltaInfos = pgTable(
  "course_delta_infos",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.userId),
    date: date("date").notNull(),
    courseCode: text("course_code")
      .notNull()
      .references(() => courses.courseCode),
    delta: smallint("delta").notNull(),
  },
  (table) => [
    // Composite PK on (user_id, date, course_code) using new syntax
    primaryKey({ columns: [table.userId, table.date, table.courseCode] }),
  ]
);
