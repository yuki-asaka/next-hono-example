import {OpenAPIHono} from "@hono/zod-openapi";
import type { Env } from "./types.js";
import {
    createArticleRoute,
    deleteArticleRoute,
    getArticleRoute,
    listArticlesRoute,
    updateArticleRoute
} from "./routes/articles.js";
import {
    createArticleHandler,
    deleteArticleHandler,
    getArticleHandler,
    listArticlesHandler,
    updateArticleHandler
} from "./handlers/articles.js";

export const articleRoute = new OpenAPIHono<Env>()
    .openapi(listArticlesRoute, listArticlesHandler)
    .openapi(createArticleRoute, createArticleHandler)
    .openapi(updateArticleRoute, updateArticleHandler)
    .openapi(deleteArticleRoute, deleteArticleHandler)
    .openapi(getArticleRoute, getArticleHandler)
