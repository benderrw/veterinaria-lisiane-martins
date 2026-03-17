"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import Image from "next/image";

export interface ReviewItem {
  rating: number;
  text: string;
  author_name: string;
  profile_photo_url?: string;
}

function StarRating({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex gap-0.5 text-primary" aria-label={`${value} de 5 estrelas`}>
      {stars.map((s) => (
        <Star
          key={s}
          className={`size-5 ${s <= value ? "fill-current" : "opacity-30"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: true,
    watchDrag: true,
  });

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="depoimentos" variant="normal">
        <h2 className="text-4xl font-light tracking-tight text-foreground [font-family:var(--font-heading),sans-serif]">
          Depoimentos
        </h2>
        <p className="text-muted-foreground">Carregando depoimentos...</p>
      </SectionWrapper>
    );
  }

  if (reviews.length === 0) {
    return (
      <SectionWrapper id="depoimentos" variant="normal">
        <h2 className="text-4xl font-light tracking-tight text-foreground [font-family:var(--font-heading),sans-serif]">
          Depoimentos
        </h2>
        <p className="text-muted-foreground">
          Em breve você poderá ver aqui as avaliações dos nossos clientes.
        </p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="depoimentos" variant="normal">
      <h2 className="text-4xl font-light tracking-tight text-foreground [font-family:var(--font-heading),sans-serif]">
        Depoimentos
      </h2>
      <p className="text-sm text-muted-foreground md:hidden">
        Arraste para o lado para ver mais depoimentos.
      </p>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {reviews.map((review, index) => (
            <div
              key={`${review.author_name}-${index}`}
              className={`min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] ${index === reviews.length - 1 ? "mr-4" : ""}`}
            >
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <StarRating value={review.rating} />
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-5">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary"
                      aria-hidden
                    >
                      {review.author_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-foreground">
                    {review.author_name}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
