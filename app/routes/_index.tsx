import { randomUUID } from 'node:crypto'
import { data, Outlet, type LoaderFunctionArgs } from "react-router";
import type { Route } from "../+types/root";
import { commitSession, getSession } from "~/sessions.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Votre météo - chaque heure" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {

  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.data.userId === undefined) {
    session.data.userId = randomUUID();
  }

  return data({

  }, {
    headers: {
      "Set-Cookie": await commitSession(session),
    }
  })
}
export default function Home() {
  return <Outlet />
}
