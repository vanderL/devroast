import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const issueStatusEnum = pgEnum("issue_status", [
	"critical",
	"warning",
	"good",
]);

export const verdictEnum = pgEnum("verdict", [
	"career_change_recommended",
	"needs_serious_help",
	"rough_around_edges",
	"not_bad",
	"actually_decent",
	"mass_respect",
]);

export const roasts = pgTable("roasts", {
	id: uuid().primaryKey().defaultRandom(),
	code: text().notNull(),
	language: varchar({ length: 50 }).notNull(),
	lineCount: integer().notNull(),
	roastMode: boolean().notNull().default(true),
	score: real().notNull(),
	verdict: verdictEnum().notNull(),
	roastMessage: text().notNull(),
	suggestedFix: text(),
	createdAt: timestamp().notNull().defaultNow(),
});

export const roastIssues = pgTable("roast_issues", {
	id: uuid().primaryKey().defaultRandom(),
	roastId: uuid()
		.notNull()
		.references(() => roasts.id, { onDelete: "cascade" }),
	status: issueStatusEnum().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	order: integer().notNull().default(0),
});
