"use client";

import React from "react";
import { GsapReviewsInfiniteSlider } from "./animations/GsapReviewsInfiniteSlider";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-16 overflow-hidden">
      <GsapReviewsInfiniteSlider
        title="What Our Clients Say About Pixim Design"
        subtitle="AUTHENTIC REVIEWS & RESULTS"
        speed={38}
        twoRows={true}
      />
    </section>
  );
};
