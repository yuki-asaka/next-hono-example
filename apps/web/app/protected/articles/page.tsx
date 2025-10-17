import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { client } from "@/lib/api/client";
import type { InferResponseType } from "hono/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ArticlesResponse = InferResponseType<typeof client.articles.$get>;
type Article = ArticlesResponse["data"][number];

async function getArticles() {
    const res = await client.articles.$get();
    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }
    console.log(res);
    const data = await res.json();
    if (!data.success) {
        throw new Error("Failed to fetch articles");
    }
    return data.data as Article[];
}

export default async function ArticlesPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/auth/login");
    }

    const articles: Article[] = await getArticles();

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Articles</h1>
                <Button asChild>
                    <Link href="/protected/articles/new">Create New Article</Link>
                </Button>
            </div>
            <ul className="flex flex-col gap-4">
                {articles.map((article) => (
                    <li key={article.id} className="p-4 border rounded-md">
                        <Link href={`/protected/articles/${article.slug}`}>
                            <h2 className="text-xl font-semibold hover:underline">{article.title}</h2>
                            <p className="text-sm text-muted-foreground">@{article.slug}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}