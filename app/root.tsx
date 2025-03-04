import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import prisma from "./models/db.server";
import { commitSession, getSession } from "./sessions.server";
import { randomUUID } from "node:crypto";
import React from "react";
export async function loader({ request }: LoaderFunctionArgs) {

  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.data.userId === undefined) {
    session.set("userId", randomUUID())
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.data.userId
    },
    select: {
      lastActionAt: true,
    }
  })

  return data({
    uuid: session.data.userId,
    lastActionAt: user?.lastActionAt,
  }, {
    headers: {
      "Set-Cookie": await commitSession(session),
    }
  })
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {

  const { uuid, lastActionAt } = useLoaderData<typeof loader>()

  return <main className="flex flex-col items-center justify-start pt-16 pb-4 bg-slate-400 min-h-[100vh]">
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <header className="flex flex-col items-center gap-9">
        <div className="w-[500px] max-w-[100vw] p-4">
          <h1 className="text-7xl font-mono font-bold">Météo 33790</h1>
          <h6>La météo de <strong>vos</strong> endroits préférés</h6>
        </div>
      </header>
      <div className="max-w-[300px] w-full space-y-6 px-4">
        <nav className={`
          rounded-3xl border border-gray-200 p-6 dark:border-gray-700
          flex flex-row gap-x-8 justify-center
          `}>
          {[
            { to: '/home', text: 'Home' },
            { to: '/about', text: 'Misson' },

          ].map(({ to, text }, i) =>
            <React.Fragment key={`${i}${text}`} >
              <NavLink to={to}
                className="text-blue-500 [&.active]:text-red-400 [&.active]:underline"
                end>{text}</NavLink>
              <span className="last:hidden">&bull;</span>
            </React.Fragment>
          )
          }
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
    <footer className="flex flex-col bg-slate-600 rounded-t-md p-2">
      <span>{uuid}</span>
      <span>Dernière action: {lastActionAt ? lastActionAt.toLocaleString() : 'Jamais'}</span>
    </footer>
  </main>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
