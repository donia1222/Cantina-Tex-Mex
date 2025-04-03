import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import Layout from "./components/Layout";
import { Analytics } from "@vercel/analytics/remix"

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
];


export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: "Ushuaia & Cantina Tex-Mex " },
    { name: "description", content: "9470 / Buchs " },
    { name: "keywords", content: "restaurant buchs" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#000000" },
  ];
};

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
  
}
