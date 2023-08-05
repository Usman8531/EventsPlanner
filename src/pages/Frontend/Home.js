import HeroSection from "components/Hero/HeroSection";
import PopularEvents from "components/PopularEvents/PopularEvents";
import RecentEvents from "components/RecentEvents/RecentEvents";
import React from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularEvents />
      <RecentEvents />
    </>
  );
}
