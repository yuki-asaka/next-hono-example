import {client} from "@/lib/api/client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DeleteButton} from "@/components/articles/delete-button";
import {notFound} from "next/navigation";
import {format} from "date-fns";

async function getArticle(slug: string) {
    const res = await client.articles[":slug"].$get({
        param: { slug },
    });

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    if (!slug) {
        notFound();
    }

    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
            <div className="flex justify-end gap-2 mb-4">
                <Button variant="outline" asChild>
                    <Link href={`/protected/articles/${article.slug}/edit`}>Edit</Link>
                </Button>
                <DeleteButton slug={article.slug} />
            </div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {article.createdAt && (
                        <time dateTime={new Date(article.createdAt).toISOString()}>
                            Published on {format(new Date(article.createdAt), "MMMM d, yyyy")}
                        </time>
                    )}
                    {article.updatedAt && article.createdAt !== article.updatedAt && (
                        <span>
                            (Updated on {format(new Date(article.updatedAt), "MMMM d, yyyy")})
                        </span>
                    )}
                </div>
            </header>
            <div className="prose dark:prose-invert max-w-none">
                <p>{article.content}</p>
            </div>
        </article>
    );
}
