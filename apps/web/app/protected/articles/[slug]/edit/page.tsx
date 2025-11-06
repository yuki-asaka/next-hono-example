import { notFound } from "next/navigation";
import { client } from "@/lib/api/client";
import { ArticleForm } from "@/components/articles/article-form";
import { updateArticle } from "@/lib/actions/articles";
import { articleSchema } from "@repo/openapi";
import { z } from "zod";

type Article = z.infer<typeof articleSchema>;

async function getArticle(slug: string): Promise<Article | null> {
    const res = await client.articles[":slug"].$get({
        param: { slug },
    });
    if (!res.ok) {
        if (res.status === 404) {
            return null;
        }
        throw new Error("Failed to fetch article");
    }
    const data = await res.json();
    
    return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
    };
}

export default async function ArticleEditPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const updateArticleWithSlug = updateArticle.bind(null, article.slug);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Edit Article</h1>
            </div>
            <ArticleForm action={updateArticleWithSlug} initialData={article} />
        </div>
    );
}
