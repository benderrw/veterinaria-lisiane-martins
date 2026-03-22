import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

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

  const metaDescription =
    "Clínica veterinária no Laranjal, Pelotas: cães e gatos. Consultas, vacinação, exames e cirurgias com hora marcada, explicações claras e cuidado humanizado. Agende pelo WhatsApp.";

  return {
    title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
    description: metaDescription,
    metadataBase: new URL(`${baseUrl}/`),
    alternates: {
      canonical: SITE_URL,
    },
    robots:
      process.env.VERCEL_ENV != null &&
      process.env.VERCEL_ENV !== "production"
        ? { index: false, follow: false }
        : undefined,
    keywords: [
      "veterinário Pelotas",
      "clínica veterinária Pelotas",
      "veterinário Laranjal",
      "clínica veterinária cães e gatos",
      "consulta veterinária hora marcada",
    ],
    manifest: "/site.webmanifest",
    openGraph: {
      title: "Clínica Veterinária Lisiane Martins | Pelotas - RS",
      description: metaDescription,
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
      description: metaDescription,
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

  const faqEntities = FAQ_ITEMS.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "VeterinaryCare"],
        "@id": `${baseUrl}/#veterinary`,
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
          postalCode: "96090-180",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -31.768615,
          longitude: -52.239981,
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
        priceRange: "$$",
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        url: `${baseUrl}/#faq`,
        mainEntity: faqEntities,
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} font-sans antialiased`}
      >
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
