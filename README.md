# Next.js, Hono, and Supabase Monorepo Example

This is a sample monorepo application demonstrating the integration of Next.js for the frontend, Hono for the backend, and Supabase as the BaaS (Backend as a Service). The project utilizes Bun as the package manager and features type-safe RPC between the frontend and backend.

## Project Structure

This project is a monorepo managed with Turbo. The main components are located in the `apps` directory:

-   `apps/web`: A Next.js application for the frontend.
-   `apps/app`: A Hono application for the backend server.
-   `apps/api`: Contains Supabase configurations, including database migrations and Edge Functions.

The `packages` directory is intended for shared code, such as UI components or utility functions.

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/)
-   A [Supabase](https://supabase.com/) account and project.

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/next-hono-example.git
    cd next-hono-example
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `apps/web` directory by copying the example file:
    ```bash
    cp apps/web/.env.example apps/web/.env
    ```
    Update the `.env` file with your Supabase project URL and anon key.

4.  **Set up Supabase:**

    Link your local project to your Supabase project:
    ```bash
    npx supabase link --project-ref <your-project-id>
    ```

    Push the database migrations:
    ```bash
    npx supabase db push
    ```

### Running the Development Servers

You can run all applications concurrently using the following command from the root of the project:

```bash
bun dev
```

This will start:
- The Next.js frontend on `http://localhost:3000`
- The Hono backend server on `http://localhost:8787`

## Features

-   **Monorepo:** A clean and organized project structure using Turborepo.
-   **Type-Safe RPC:** End-to-end type safety between the Next.js frontend and the Hono backend.
-   **Supabase Integration:** Utilizes Supabase for database, authentication, and other backend services.
-   **Modern Tech Stack:** Built with Next.js, Hono, TypeScript, and Bun.

## Technologies Used

-   **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend:** [Hono](https://hono.dev/)
-   **Database & BaaS:** [Supabase](https://supabase.com/)
-   **Package Manager:** [Bun](https://bun.sh/)
-   **Monorepo Manager:** [Turborepo](https://turbo.build/)

## License

This project is licensed under the MIT License.
