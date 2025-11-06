import {RouteHandler, z} from "@hono/zod-openapi";
import type { Env } from "../types.js";
import {articles} from "../db/schema.js";
import {eq} from "drizzle-orm"
import {
    createArticleRoute,
    deleteArticleRoute,
    getArticleRoute,
    listArticlesRoute,
    updateArticleRoute
} from "../routes/articles.js";
import {errorResponseSchema} from "@repo/openapi";


export const listArticlesHandler: RouteHandler<typeof listArticlesRoute, Env> = async (c) => {
    const client = c.get("db");
    const articleList = await client.select().from(articles);
    return c.json(articleList, 200);
}

export const getArticleHandler: RouteHandler<typeof getArticleRoute, Env> = async (c) => {
    const { slug } = c.req.valid("param");
    const client = c.get("db");
    const article = await client.query.articles.findFirst({ where: eq(articles.slug, slug) });

    if (!article) {
        return c.json({ message: "Not Found" } as z.infer<typeof errorResponseSchema>, 404);
    }
    return c.json(article, 200);
}

export const createArticleHandler: RouteHandler<typeof createArticleRoute, Env> = async (c) => {
    const client = c.get("db");
    const body = c.req.valid("json");

    const exists = await client.select().from(articles)
        .where(eq(articles.slug, body.slug));

    if (exists.length > 0) {
        return c.json({ message: "Slug already exists" }, 409);
    }

    const article = await client.insert(articles).values(body).returning();

    return c.json(article[0], 200);
}

export const updateArticleHandler: RouteHandler<typeof updateArticleRoute, Env> = async (c) => {
    const client = c.get("db");
    const { slug } = c.req.valid("param");
    const body = c.req.valid("json");

    const targetArticle = await client.query.articles.findFirst({ where: eq(articles.slug, slug) });
    if (!targetArticle) {
        return c.json({ message: "Article to update not found" }, 404);
    }

    if (body.slug) {
        if (body.slug !== targetArticle.slug) {
            const exist = await client.query.articles.findFirst({ where: eq(articles.slug, body.slug) });

            if (exist) {
                return c.json({ message: "New slug already exists" }, 409);
            }
        }
    }

    const updatedArticles = await client.update(articles)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(articles.slug, slug))
        .returning();

    return c.json(updatedArticles[0], 200);
}

export const deleteArticleHandler: RouteHandler<typeof deleteArticleRoute, Env> = async (c) => {
    const client = c.get("db");
    const { slug } = c.req.valid("param");

    const targetArticle = await client.query.articles.findFirst({ where: eq(articles.slug, slug) });
    if (!targetArticle) {
        return c.json({ message: "Article to delete not found" }, 404);
    }

    await client.delete(articles).where(eq(articles.slug, slug));

    return c.json({ message: "Article deleted" }, 200);
}
