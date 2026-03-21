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
    "lisianemartins.vet";
  const protocol =
    headersList.get("x-forwarded-proto") === "https"
      ? "https"
      : host.includes("localhost")
        ? "http"
        : "https";
  const baseUrl = `${protocol}://${host}`;

  return {
    title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
    description:
      "Clínica veterinária em Pelotas para cães e gatos: consultas, vacinação, exames e cirurgias com hora marcada, orientação clara e cuidado humanizado.",
    metadataBase: new URL(`${baseUrl}/`),
    alternates: {
      canonical: "https://www.lisianemartins.vet",
    },
    openGraph: {
      title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
      description:
        "Clínica veterinária em Pelotas para cães e gatos: consultas, vacinação, exames e cirurgias com hora marcada, orientação clara e cuidado humanizado.",
      url: `${baseUrl}/`,
      siteName: "Clínica Veterinária Lisiane Martins",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og.png`,
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
        "Clínica veterinária em Pelotas para cães e gatos: consultas, vacinação, exames e cirurgias com hora marcada, orientação clara e cuidado humanizado.",
      images: [`${baseUrl}/og.png`],
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
  const isProduction = process.env.NODE_ENV === "production";

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
    sameAs: ["https://www.instagram.com/vet.lisianebtmartins/"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "R$R$",
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
        {children}
        {isProduction && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
