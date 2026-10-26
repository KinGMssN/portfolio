import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Check, CodeXml, Copy, FileText, Github, Linkedin } from "lucide-react";
import { education, organizations, profile, projects, skills, socials } from "@/content/portfolio";
import { ExperienceCard } from "@/components/portfolio/ExperienceCard";
import { EducationCard } from "@/components/portfolio/EducationCard";
import { ProjectAtmosphere } from "@/components/portfolio/ProjectAtmosphere";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SkillBranch, type SkillCategory } from "@/components/portfolio/SkillBranch";
import { ContactAtmosphere } from "@/components/portfolio/ContactAtmosphere";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActive() {
  const [progress, setProgress] = useState(-1);
  useEffect(() => {
    const onScroll = () => {
      const start = document.getElementById("dark")?.offsetTop ?? 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(y < start - 200 ? -1 : Math.min(1, (y - start) / Math.max(1, max - start)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function Section({
  id,
  index,
  title,
  className,
  background,
  children,
}: {
  id: string;
  index: string;
  title: string;
  className?: string;
  background?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`border-t border-void-line px-6 py-28 sm:px-12 md:py-40 lg:px-24 ${className ?? ""}`}
    >
      {background}
      <div className="reveal grid gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="flex items-baseline gap-4 md:flex-col md:gap-2">
          <span className="font-display text-sm text-blossom">{index}</span>
          <h2 className="text-xs uppercase tracking-[0.35em] text-mist-dim">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function DarkPortfolio() {
  useReveal();
  const progress = useActive();
  const [lockedProject, setLockedProject] = useState<string | null>(null);
  const [emailCopyStatus, setEmailCopyStatus] = useState<"copied" | "unavailable" | null>(null);
  const visible = progress >= 0;
  const links = socials.filter((s) => s.href);

  const copyEmail = () => {
    if (!navigator.clipboard?.writeText) {
      setEmailCopyStatus("unavailable");
      return;
    }

    void navigator.clipboard
      .writeText(profile.email)
      .then(() => setEmailCopyStatus("copied"))
      .catch(() => setEmailCopyStatus("unavailable"));
  };

  useEffect(() => {
    const section = document.getElementById("path");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("experience-has-entered");
      }
      section.classList.toggle("experience-in-view", entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.getElementById("contact");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("contact-in-view", entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.getElementById("work");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("projects-in-view", entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-void text-mist">
      <header
        className={`portfolio-header fixed inset-x-0 top-0 z-40 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div
          className="h-px bg-blossom origin-left"
          style={{ transform: `scaleX(${Math.max(0, progress)})` }}
        />
        <nav
          aria-label="Main"
          className="flex items-center justify-between bg-void/70 px-6 py-4 backdrop-blur-md sm:px-12 lg:px-24"
        >
          <a
            href="#top"
            className="font-jp text-xl text-blossom"
            aria-label="Back to the beginning"
          >
            {profile.kanji}
          </a>
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-7">
            <ul aria-label="Social links" className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {links.map((social) => {
                const Icon =
                  social.label === "LinkedIn"
                    ? Linkedin
                    : social.label === "GitHub"
                      ? Github
                      : CodeXml;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="contact-social-link inline-flex items-center gap-1.5 text-mist-dim transition-colors hover:text-blossom sm:gap-2"
                    >
                      <Icon size={19} aria-hidden="true" />
                      <span className="hidden text-xs sm:inline lg:text-sm">{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="/CV/CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="contact-social-link inline-flex items-center gap-1.5 text-sm text-mist-dim"
            >
              <FileText size={19} aria-hidden="true" />
              CV
            </a>
          </div>
        </nav>
      </header>

      <section
        id="dark"
        className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-20 pt-28 sm:px-12 lg:px-24"
        aria-labelledby="about-heading"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-jp text-[40vw] leading-none text-void-raised opacity-50 md:text-[28vw]"
        >
          {profile.kanji}
        </span>
        <div
          id="about"
          className="reveal relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] lg:gap-20"
        >
          <div className="mb-0 flex items-baseline gap-4 md:col-span-2">
            <span className="font-display text-sm text-blossom">01</span>
            <p className="text-xs uppercase tracking-[0.35em] text-mist-dim">About Me</p>
          </div>
          <figure className="relative mx-auto w-full max-w-[390px]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/123.png"
                alt="Mohith holding a camera"
                className="h-full w-full object-contain opacity-80"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.24em] text-mist-dim">
              {profile.fullName}
            </figcaption>
          </figure>
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.4em] text-blossom">{profile.role}</p>
            <h2
              id="about-heading"
              className="mt-5 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Beneath the blossoms,
              <br />
              <em className="text-blossom">the work.</em>
            </h2>
            <p className="mt-7 text-base leading-relaxed text-mist-dim sm:text-lg">
              {profile.about}
            </p>
            <p className="mt-6 text-sm text-mist-dim">{profile.location}</p>
          </div>
        </div>
      </section>

      <Section id="skills" index="02" title="Skills & Tools">
        <SkillBranch
          categories={skills.map(({ group, items }): SkillCategory => ({ name: group, items }))}
        />
      </Section>

      <Section id="work" index="03" title="Real Time Projects" className="project-section">
        <ProjectAtmosphere />
        <p className="mb-10 text-sm text-mist-dim">
          A collection of skills and tools, gathered on paper.
        </p>
        <ul className="project-card-list">
          {projects.map((p, i) => (
            <li key={p.title} className="group border-b border-void-line">
              <ProjectCard
                project={p}
                index={i}
                isLocked={lockedProject === p.title}
                onLock={(open) => setLockedProject(open ? p.title : null)}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="path"
        index="04"
        title="Academic Journey & Collaboration"
        className="experience-section"
      >
        <div className="experience-atmosphere" aria-hidden="true">
          <svg className="experience-network" viewBox="0 0 1000 1200" preserveAspectRatio="none">
            <path d="M0 170h115l55 55h94m736-125h-108l-48 48h-86M0 850h150l46-46h94m710-45h-134l-52 52h-92M345 0v105l52 52m185 1043v-88l-62-62" />
            <circle cx="115" cy="170" r="2" />
            <circle cx="170" cy="225" r="2" />
            <circle cx="264" cy="225" r="1.5" />
            <circle cx="892" cy="100" r="2" />
            <circle cx="844" cy="148" r="2" />
            <circle cx="758" cy="148" r="1.5" />
            <circle cx="150" cy="850" r="2" />
            <circle cx="196" cy="804" r="2" />
            <circle cx="290" cy="804" r="1.5" />
            <circle cx="866" cy="759" r="2" />
            <circle cx="814" cy="811" r="2" />
            <circle cx="722" cy="811" r="1.5" />
          </svg>
          <span className="experience-petal experience-petal-one">✿</span>
          <span className="experience-petal experience-petal-two">✿</span>
          <span className="experience-petal experience-petal-three">✿</span>
          <span className="experience-drifting-petal experience-drifting-petal-one" />
          <span className="experience-drifting-petal experience-drifting-petal-two" />
          <span className="experience-drifting-petal experience-drifting-petal-three" />
          <span className="experience-drifting-petal experience-drifting-petal-four" />
          <span className="experience-drifting-petal experience-drifting-petal-five" />
          <span className="experience-data-point experience-data-point-one" />
          <span className="experience-data-point experience-data-point-two" />
          <span className="experience-data-point experience-data-point-three" />
          <span className="experience-data-point experience-data-point-four" />
          <span className="experience-light-streak" />
        </div>
        <div className="experience-education">
          <p className="experience-eyebrow">My Academic Journey</p>
          <ol className="experience-education-list">
            {education.map((qualification, i) => (
              <li key={qualification.number} className="experience-education-item">
                <EducationCard qualification={qualification} reversed={i === 1} />
              </li>
            ))}
          </ol>
        </div>
        <div className="experience-collaborations">
          <div className="experience-heading">
            <div>
              <p className="experience-eyebrow">Communities &amp; contribution</p>
              <h3 className="font-display text-3xl font-light sm:text-4xl">
                Shared work, <em className="text-blossom">shared growth.</em>
              </h3>
            </div>
          </div>
          <ul className="experience-card-grid">
            {organizations.map((organization, i) => (
              <li key={organization.name}>
                <ExperienceCard organization={organization} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="contact"
        index="05"
        title="Contact"
        className="contact-section isolate"
        background={<ContactAtmosphere />}
      >
        <div className="contact-email-wrap">
          <a
            href={`mailto:${profile.email}`}
            onClick={copyEmail}
            className="contact-email link-line break-all font-display text-3xl font-light text-mist hover:text-blossom sm:text-6xl"
            aria-label={`${profile.email} (click to copy; opens your email app)`}
          >
            {Array.from(profile.email).map((character, index) => (
              <span
                key={`${character}-${index}`}
                className="contact-email-character"
                aria-hidden="true"
                style={{ "--character-index": index } as CSSProperties}
              >
                {character}
              </span>
            ))}
          </a>
          <span
            className="contact-email-hint"
            aria-live="polite"
            data-visible={emailCopyStatus !== null}
          >
            {emailCopyStatus === "copied" ? (
              <>
                <Check size={13} aria-hidden="true" /> Email copied
              </>
            ) : emailCopyStatus === "unavailable" ? (
              "Copy unavailable"
            ) : (
              <>
                <Copy size={13} aria-hidden="true" /> Copy email
              </>
            )}
          </span>
        </div>
        <ul
          aria-label="Social profiles"
          className="contact-social-wrap contact-social-list flex flex-wrap gap-x-8 gap-y-5"
        >
          {links.map((social) => {
            const Icon =
              social.label === "LinkedIn" ? Linkedin : social.label === "GitHub" ? Github : CodeXml;

            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`contact-social-link contact-social-link-${social.label.toLowerCase()} inline-flex items-center gap-2 text-mist-dim transition-colors hover:text-blossom`}
                >
                  <Icon size={19} aria-hidden="true" />
                  <span className="text-sm">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <aside className="experience-collab-cta contact-collab-cta">
          <div className="contact-panel-copy">
            <p className="experience-eyebrow">Open to good ideas</p>
            <h3 className="font-display text-3xl font-light sm:text-4xl">
              Let&apos;s build something meaningful.
            </h3>
            <p className="experience-cta-copy">
              I&apos;m always interested in connecting, exploring new ideas, and collaborating on
              meaningful projects.
            </p>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noreferrer"
              className="experience-cta-link"
            >
              Let&apos;s collaborate <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </Section>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-void-line px-6 py-10 text-xs text-mist-dim sm:flex-row sm:px-12 lg:px-24">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <a href="#top" className="link-line uppercase tracking-[0.25em] hover:text-blossom">
          Return to the garden ↑
        </a>
      </footer>
    </div>
  );
}
