import { createRoute } from "@hono/zod-openapi";
import {
  articleSchema,
  articlesSchema,
  createArticleSchema,
  errorResponseSchema,
  requestParams,
  updateArticleSchema
} from "@repo/openapi";
import {z} from "zod";


export const listArticlesRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: articlesSchema
        }
      }
    }
  }
})

export const getArticleRoute = createRoute({
  method: "get",
  path: "/{slug}",
  request: {
    params: requestParams
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: articleSchema
        }
      }
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
})

export const createArticleRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createArticleSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: articleSchema
        }
      }
    },
    409: {
      description: "Conflict",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
})

export const updateArticleRoute = createRoute({
  method: "put",
  path: "/{slug}",
  request: {
    params: requestParams,
    body: {
      content: {
        "application/json": {
          schema: updateArticleSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: articleSchema
        }
      }
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    },
    409: {
      description: "Conflict",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
})

export const deleteArticleRoute = createRoute({
  method: "delete",
  path: "/{slug}",
  request: {
    params: requestParams
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string()
          })
        }
      }
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
})
