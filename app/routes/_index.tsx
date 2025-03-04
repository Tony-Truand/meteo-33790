import { Outlet } from "react-router";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Votre météo - chaque heure" },
  ];
}


export default function Home() {
  return <Outlet />
}
