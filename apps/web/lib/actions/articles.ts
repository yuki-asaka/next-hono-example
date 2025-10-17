"use server";

import { client } from "@/lib/api/client";
import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";
import {createArticleSchema, updateArticleSchema} from "@repo/app/schemas/article";

export type FormState = {
    message: string;
    errors?: {
        title?: string[];
        slug?: string[];
        content?: string[];
    };
};

export async function createArticle(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const validatedFields = createArticleSchema.safeParse(
        Object.fromEntries(formData.entries()),
    );

    if (!validatedFields.success) {
        return {
            message: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const res = await client.articles.$post({ json: validatedFields.data});
    console.log(res);

    if (!res.ok) {
        const error = (await res.json()) as { message: string };
        return { message: `Failed to create article: ${error.message}` };
    }

    console.log(res)

    revalidatePath("/protected/articles");
    redirect("/protected/articles");
}

export async function updateArticle(
    slug: string,
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const validatedFields = updateArticleSchema.safeParse(
        Object.fromEntries(formData.entries()),
    );

    if (!validatedFields.success) {
        return {
            message: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const res = await client.articles[":slug"].$put({
        param: { slug },
        json: validatedFields.data,
    });

    if (!res.ok) {
        const error = (await res.json()) as { message: string };
        return { message: `Failed to update article: ${error.message}` };
    }

    revalidatePath("/protected/articles");
    revalidatePath(`/protected/articles/${validatedFields.data.slug}`);
    redirect("/protected/articles");
}

export async function deleteArticle(slug: string) {
    const res = await client.articles[":slug"].$delete({ param: { slug } });

    if (!res.ok) {
        throw new Error("Failed to delete article");
    }

    revalidatePath("/protected/articles");
    redirect("/protected/articles");
}
