import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.lisianemartins.vet";

function getBaseUrl(host: string, protocol: string) {
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ??
    headersList.get("host") ??
    "www.lisianemartins.vet";
  const protocol =
    headersList.get("x-forwarded-proto") === "https"
      ? "https"
      : host.includes("localhost")
        ? "http"
        : "https";
  const baseUrl = getBaseUrl(host, protocol);

  return {
    title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
    description:
      "Clínica veterinária em Pelotas, RS. Consultas, vacinação, cirurgia e cuidados para seu pet. Atendimento humanizado.",
    metadataBase: new URL(`${baseUrl}/`),
    icons: {
      icon: [
        { url: "/tmp/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/tmp/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/tmp/favicon.ico", sizes: "any" },
      ],
      apple: "/tmp/apple-touch-icon.png",
      other: [
        {
          rel: "manifest",
          url: "/tmp/site.webmanifest",
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/`,
    },
    openGraph: {
      title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
      description:
        "Clínica veterinária em Pelotas, RS. Consultas, vacinação, cirurgia e cuidados para seu pet. Atendimento humanizado.",
      url: `${baseUrl}/`,
      siteName: "Clínica Veterinária Lisiane Martins",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Clínica Veterinária Lisiane Martins - Pelotas, RS",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
      description:
        "Clínica veterinária em Pelotas, RS. Consultas, vacinação, cirurgia e cuidados para seu pet. Atendimento humanizado.",
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ??
    headersList.get("host") ??
    "www.lisianemartins.vet";
  const protocol =
    headersList.get("x-forwarded-proto") === "https"
      ? "https"
      : host.includes("localhost")
        ? "http"
        : "https";
  const baseUrl = getBaseUrl(host, protocol);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Clínica Veterinária Lisiane Martins",
    image: `${baseUrl}/og.png`,
    url: baseUrl,
    telephone: "+5553981166455",
    email: "vet.lisianebtmartins@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Viamão, 349",
      addressLocality: "Pelotas",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.764,
      longitude: -52.341,
    },
    sameAs: [
      "https://www.instagram.com/vet.lisianebtmartins/",
    ],
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only rounded bg-primary px-4 py-2 text-primary-foreground focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:[clip:auto]"
        >
          Pular para o conteúdo principal
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
