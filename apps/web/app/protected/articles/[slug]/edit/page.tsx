import { notFound } from "next/navigation";
import { client } from "@/lib/api/client";
import { ArticleForm } from "@/components/articles/article-form";
import { updateArticle } from "@/lib/actions/articles";
import type { InferResponseType } from "hono/client";

type ArticleResponse = InferResponseType<typeof client.articles[":slug"]>;
type Article = ArticleResponse["data"];

async function getArticle(slug: string) {
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
    if (!data.success) {
        throw new Error("Failed to fetch article");
    }
    return data.data as Article;
}

export default async function ArticleEditPage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    const updateArticleWithSlug = updateArticle.bind(null, params.slug);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Edit Article</h1>
            </div>
            <ArticleForm action={updateArticleWithSlug} initialData={article} />
        </div>
    );
}
