import z from "zod";

export const articleSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "title required").max(255, "title less than 255"),
    content: z.string().min(1, "content required"),
    slug: z.string().min(1, "slug required").max(255, "slug less than 255").regex(/^[a-z0-9-]+$/, "slug can only contain lowercase letters, numbers, and dashes"),
    createdAt: z.union([z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()), z.string()]).optional(),
    updatedAt: z.union([z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()), z.string()]).optional()
})

export const createArticleSchema = articleSchema.omit({id: true, createdAt: true, updatedAt: true});
export const updateArticleSchema = articleSchema.partial().omit({id: true, createdAt: true, updatedAt: true});

export type Article = z.infer<typeof articleSchema>;
export type CreateArticle = z.infer<typeof createArticleSchema>;
export type UpdateArticle = z.infer<typeof updateArticleSchema>;
