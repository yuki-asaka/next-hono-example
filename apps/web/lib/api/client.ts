import type { AppType } from '@repo/app'
import { hc } from 'hono/client'

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const res = await fetch(input, init)

  if (!res.ok && res.status !== 404) {
    let errorMessage = `An API error occurred: ${res.status} ${res.statusText}`;
    try {
      const errorData = await res.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
        console.log(e);
    }
    throw new Error(errorMessage);
  }

  return res
}

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, {
  fetch: customFetch,
})
