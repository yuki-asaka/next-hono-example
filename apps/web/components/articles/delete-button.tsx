"use client";

import { deleteArticle } from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";

export function DeleteButton({ slug }: { slug: string }) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this article?")) {
            await deleteArticle(slug);
        }
    };

    return (
        <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
}
