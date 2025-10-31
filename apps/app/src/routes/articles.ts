import {Env} from "../db/client";
import {Hono} from "hono";
import {getDbClient} from "../helpers/dbClient";
import {articles} from "../db/schema";
import {eq} from "drizzle-orm"
import {zValidator} from "@hono/zod-validator";
import {createArticleSchema, updateArticleSchema} from "../schemas/article";


export const articleRoutes = new Hono<{ Bindings: Env }>()
    .get("/", async (c) => {
        const client = getDbClient(c);
        const articleList = await client.select().from(articles);

        return c.json({
            success: true,
            data: articleList
        })
    })

    .get("/:slug", async (c) => {
        const client = getDbClient(c);
        const slug = c.req.param("slug");
        console.log(slug)
        const article = await client.select().from(articles).where(eq(articles.slug, slug));

        if (article.length === 0) {
            return c.json({
                success: false,
                message: "Article not found"
            },
                404
            )
        }

        return c.json({
            success: true,
            data: article[0]
        })
    })

    .post("/", zValidator("json", createArticleSchema), async (c) => {
        const client = getDbClient(c);
        const body = c.req.valid("json");

        // check slug
        const exists = await client.select().from(articles)
            .where(eq(articles.slug, body.slug));

        if (exists.length > 0) {
            return c.json({
                success: false,
                message: "Slug already exists"
            },
                409
            )
        }

        const article = await client.insert(articles).values(body).returning();

        return c.json({
            success: true,
            data: article[0]
        })
    })

    .put("/:slug", zValidator("json", updateArticleSchema), async (c) => {
        const client = getDbClient(c);
        const body = c.req.valid("json");
        const originalSlug = c.req.param("slug");

        const targetArticle = await client.select().from(articles).where(eq(articles.slug, originalSlug));
        if (targetArticle.length === 0) {
            return c.json({
                success: false,
                message: "Article to update not found"
            }, 404);
        }

        if (body.slug) {
            if (body.slug !== originalSlug) {
                const exist = await client.select().from(articles)
                .where(eq(articles.slug, body.slug));

                if (exist.length > 0) {
                    return c.json({
                        success: false,
                        message: "New slug already exists"
                    }, 409);
                }
            }
        }

        const updatedArticle = await client.update(articles)
            .set({ ...body, updatedAt: new Date() })
            .where(eq(articles.slug, originalSlug))
            .returning();

        return c.json({
            success: true,
            data: updatedArticle[0]
        });
    })

    .delete("/:slug", async (c) => {
        const client = getDbClient(c);
        const slug = c.req.param("slug");

        const targetArticle = await client.select().from(articles).where(eq(articles.slug, slug));
        if (targetArticle.length === 0) {
            return c
                .json({
                    success: false,
                    message: "Article to delete not found"
                }, 404);
            }

        await client.delete(articles).where(eq(articles.slug, slug));

        return c.json({
            success: true,
            message: "Article deleted"
        })
    })
