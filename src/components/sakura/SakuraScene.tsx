import sakura from "@/assets/sakura-branch.jpg";
import { profile } from "@/content/portfolio";

/** The light world. Rendered once as the intro, and again (non-interactive) on every flip tile. */
export function SakuraScene({ decorative = false }: { decorative?: boolean }) {
  return (
    <div
      className="relative h-svh w-screen overflow-hidden bg-paper text-ink"
      aria-hidden={decorative || undefined}
    >
      <img
        src={sakura}
        alt=""
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-right-top"
        draggable={false}
      />
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 sm:px-12 md:justify-center md:pb-0 lg:px-24">
        <span className="font-jp text-7xl text-blossom-deep/80 md:text-8xl">{profile.kanji}</span>
        <h1 className="mt-4 font-display text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
          {profile.intro}
        </p>
        {!decorative && (
          <a
            href="#dark"
            className="mt-12 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-soft"
          >
            <span className="h-px w-10 bg-ink-soft" /> Scroll to enter
          </a>
        )}
      </div>
    </div>
  );
}
