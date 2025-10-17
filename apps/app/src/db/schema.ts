import {pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    slug: varchar("slug", {length: 255}).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const schema = { articles };
