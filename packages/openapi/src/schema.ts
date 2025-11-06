import { z } from "@hono/zod-openapi";


export const errorResponseSchema = z.object({
    message: z.string()
}).openapi("ErrorResponse", {
    example: { message: "Not Found" },
});

export const requestParams = z.object({
    slug: z.string().min(1),
}).openapi("RequestParams")

export const articleSchema = z.object({
    id: z.number().openapi({
        example: 1,
    }),
    title: z.string().openapi({
        example: "Article Title",
    }),
    content: z.string().openapi({
        example: "Article Content",
    }),
    slug: z.string().openapi({
        example: "article-title",
    }),
    createdAt: z.date().openapi({
        example: "2024-01-01T00:00:00.000Z",
    }),
    updatedAt: z.date().openapi({
        example: "2024-01-01T00:00:00.000Z",
    }),
}).openapi("Article")

export const articlesSchema = z.array(articleSchema).openapi("Articles")

export const createArticleSchema = z.object({
    title: z.string(),
    content: z.string(),
    slug: z.string(),
})

export const updateArticleSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    slug: z.string().optional(),
})
