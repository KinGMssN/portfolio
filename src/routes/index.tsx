import { createFileRoute } from "@tanstack/react-router";
import { Petals } from "@/components/sakura/Petals";
import { FlipTransition } from "@/components/sakura/FlipTransition";
import { DarkPortfolio } from "@/components/portfolio/DarkPortfolio";
import { profile } from "@/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Sakura Portfolio` },
      { name: "description", content: "An interactive portfolio that turns from a sakura garden into a dark, cinematic showcase of work." },
      { property: "og:title", content: `${profile.name} — Sakura Portfolio` },
      { property: "og:description", content: "From a quiet sakura garden into a dark, cinematic portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="top">
      <h1 className="sr-only">{profile.name} — portfolio</h1>
      <a href="#dark" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-2">Skip to portfolio</a>
      <Petals />
      <FlipTransition />
      <DarkPortfolio />
    </main>
  );
}
