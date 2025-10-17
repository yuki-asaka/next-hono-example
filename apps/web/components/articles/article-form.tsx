"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/actions/articles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Article = {
    title: string;
    slug: string;
    content: string;
};

type ArticleFormProps = {
    action: (prevState: FormState, formData: FormData) => Promise<FormState>;
    initialData?: Article;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Article"}
        </Button>
    );
}

export function ArticleForm({ action, initialData }: ArticleFormProps) {
    const [state, formAction] = useActionState(action, { message: "" });

    return (
        <form action={formAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={initialData?.title}
                    required
                />
                {state.errors?.title && (
                    <p className="text-sm text-red-500">{state.errors.title.join(", ")}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    name="slug"
                    defaultValue={initialData?.slug}
                    required
                />
                {state.errors?.slug && (
                    <p className="text-sm text-red-500">{state.errors.slug.join(", ")}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    name="content"
                    defaultValue={initialData?.content}
                    required
                />
                {state.errors?.content && (
                    <p className="text-sm text-red-500">{state.errors.content.join(", ")}</p>
                )}
            </div>
            <SubmitButton />
            {state.message && !state.errors && <p className="text-sm text-red-500">{state.message}</p>}
        </form>
    );
}
