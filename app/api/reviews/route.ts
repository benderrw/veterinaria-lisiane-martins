import { NextResponse } from "next/server";

/**
 * Resolve API key and Place ID from env.
 * - If GOOGLE_PLACE_ID starts with "AIzaSy", it is treated as API key and
 *   GOOGLE_PLACE_ID_FOR_REVIEWS is used as the place ID.
 * - Otherwise GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID (or GOOGLE_PLACE_ID_FOR_REVIEWS) are used.
 */
function getConfig() {
  const placeIdEnv = process.env.GOOGLE_PLACE_ID ?? "";
  const apiKey =
    placeIdEnv.startsWith("AIzaSy")
      ? placeIdEnv
      : (process.env.GOOGLE_PLACES_API_KEY ?? "");
  const placeId =
    placeIdEnv.startsWith("AIzaSy")
      ? (process.env.GOOGLE_PLACE_ID_FOR_REVIEWS ?? "")
      : (process.env.GOOGLE_PLACE_ID_FOR_REVIEWS ?? process.env.GOOGLE_PLACE_ID ?? placeIdEnv);
  return { apiKey, placeId };
}

export interface ReviewItem {
  rating: number;
  text: string;
  author_name: string;
  profile_photo_url?: string;
}

export async function GET() {
  const { apiKey, placeId } = getConfig();
  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY and Place ID configuration" },
      { status: 503 }
    );
  }

  // Places API (New) expects place ID in URL. Short format "g/1td0v1cn" may need
  // to be converted to long format (ChIJ...) for the new API — see Google docs.
  const placeIdNormalized = placeId.startsWith("places/") ? placeId : `places/${placeId}`;
  const url = `https://places.googleapis.com/v1/${placeIdNormalized}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Places API error:", res.status, err);
      return NextResponse.json(
        { error: "Could not fetch reviews" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        authorAttribution?: {
          displayName?: string;
          photoUri?: string;
        };
      }>;
    };

    const reviews = (data.reviews ?? []).map((r) => ({
      rating: r.rating ?? 0,
      text: r.text?.text ?? "",
      author_name: r.authorAttribution?.displayName ?? "Anônimo",
      profile_photo_url: r.authorAttribution?.photoUri,
    })) as ReviewItem[];

    return NextResponse.json(reviews);
  } catch (e) {
    console.error("Reviews fetch error:", e);
    return NextResponse.json(
      { error: "Could not fetch reviews" },
      { status: 500 }
    );
  }
}
