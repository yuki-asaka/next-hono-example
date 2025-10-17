import { createArticle } from "@/lib/actions/articles";
import { ArticleForm } from "@/components/articles/article-form";

export default function NewArticlePage() {
    return (
        <div className="w-full max-w-md">
            <h1 className="font-bold text-2xl mb-6">Create New Article</h1>
            <ArticleForm action={createArticle} />
        </div>
    );
}
