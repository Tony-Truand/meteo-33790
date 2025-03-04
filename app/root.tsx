import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { cn } from "./utils/tailwind";

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
  return <main className="flex items-center justify-center pt-16 pb-4">
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
            { to: '/', text: 'Home' },
            { to: '/about', text: 'Misson' },

          ].map(({ to, text }, i) =>
            <>
              <NavLink key={i} to={to}
                className="text-blue-500 [&.active]:text-red-400 [&.active]:underline"
                end>{text}</NavLink>
              <span className="last:hidden">&bull;</span>
            </>
          )
          }
        </nav>
      </div>
      <div className="bg-lime-400">
        <Outlet />
      </div>
    </div>
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
