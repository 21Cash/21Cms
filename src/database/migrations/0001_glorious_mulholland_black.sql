CREATE TABLE "course_attendance_infos" (
	"attendance_info_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_attendance_id" uuid NOT NULL,
	"course_code" text NOT NULL,
	"classes_held" smallint NOT NULL,
	"classes_present" smallint NOT NULL,
	"course_attendance" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_delta_infos" (
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"course_code" text NOT NULL,
	"delta" smallint NOT NULL,
	CONSTRAINT "course_delta_infos_user_id_date_course_code_pk" PRIMARY KEY("user_id","date","course_code")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"course_code" text PRIMARY KEY NOT NULL,
	"course_name" text
);
--> statement-breakpoint
CREATE TABLE "full_attendance_infos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"total_classes_held" smallint NOT NULL,
	"total_classes_present" smallint NOT NULL,
	"attendance_percent" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_refresh" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "course_attendance_infos" ADD CONSTRAINT "course_attendance_infos_full_attendance_id_full_attendance_infos_id_fk" FOREIGN KEY ("full_attendance_id") REFERENCES "public"."full_attendance_infos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_attendance_infos" ADD CONSTRAINT "course_attendance_infos_course_code_courses_course_code_fk" FOREIGN KEY ("course_code") REFERENCES "public"."courses"("course_code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_delta_infos" ADD CONSTRAINT "course_delta_infos_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_delta_infos" ADD CONSTRAINT "course_delta_infos_course_code_courses_course_code_fk" FOREIGN KEY ("course_code") REFERENCES "public"."courses"("course_code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "full_attendance_infos" ADD CONSTRAINT "full_attendance_infos_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "full_attendance_infos_user_date_idx" ON "full_attendance_infos" USING btree ("user_id","date");