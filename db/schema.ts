import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ageGroup: text("age_group").notNull(),
  telegram: text("telegram").notNull().unique(),
  phone: text("phone"),
  consentVersion: text("consent_version").notNull(),
  createdAt: integer("created_at").notNull(),
});
export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  window: integer("window").notNull(),
  hits: integer("hits").notNull(),
});
