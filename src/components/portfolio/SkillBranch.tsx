import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { skillIcon } from "./skillLogos";

export type SkillCategory = { name: string; items: string[] };

type Point = [number, number];

function getItemsPerRow(width: number) {
  return width <= 360 ? 1 : 2;
}

function getAnchorPoints(count: number, row: number, compact: boolean): Point[] {
  const cardPoints = Array.from({ length: count }, (_, index): Point => {
    const x =
      count === 1
        ? 500
        : compact
          ? 250 + (500 * index) / (count - 1)
          : 100 + (800 * index) / (count - 1);
    const wave = Math.sin(index * 1.3 + row * 0.9) * 18;
    const offset = row % 2 === 0 ? 0 : Math.cos(index * 0.8) * 10;
    return [x, 90 + wave + offset];
  });

  return [[24, 96 + Math.sin(row * 0.8) * 12], ...cardPoints, [976, 96 + Math.cos(row * 0.8) * 12]];
}

function getRopePath(points: Point[]) {
  return points
    .slice(0, -1)
    .map(([x, y], index) => {
      const previous = points[Math.max(index - 1, 0)];
      const next = points[index + 1];
      const afterNext = points[Math.min(index + 2, points.length - 1)];
      const controlOne: Point = [x + (next[0] - previous[0]) / 6, y + (next[1] - previous[1]) / 6];
      const controlTwo: Point = [
        next[0] - (afterNext[0] - x) / 6,
        next[1] - (afterNext[1] - y) / 6,
      ];

      return `${index === 0 ? `M ${x} ${y}` : ""} C ${controlOne[0]} ${controlOne[1]}, ${controlTwo[0]} ${controlTwo[1]}, ${next[0]} ${next[1]}`;
    })
    .join(" ");
}

function SkillCard({
  category,
  index,
  anchor,
  selected,
  highlighted,
  onToggle,
  onHighlight,
}: {
  category: SkillCategory;
  index: number;
  anchor: Point;
  selected: boolean;
  highlighted: boolean;
  onToggle: (category: SkillCategory, trigger: HTMLButtonElement) => void;
  onHighlight: (highlighted: boolean) => void;
}) {
  const stringLength = 42 + ((index * 19) % 34);
  const style = {
    left: `clamp(var(--skill-card-half, 66px), ${anchor[0] / 10}%, calc(100% - var(--skill-card-half, 66px)))`,
    top: `${(anchor[1] / 400) * 100}%`,
    "--string-length": `${stringLength}px`,
    "--sway-duration": `${5.8 + (index % 4) * 0.7}s`,
    "--float-duration": `${4.6 + (index % 3) * 0.8}s`,
    "--motion-delay": `${-index * 0.65}s`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`skill-hanger${selected ? " skill-hanger-selected" : ""}${highlighted ? " skill-hanger-highlighted" : ""}`}
      style={style}
      onClick={(event) => onToggle(category, event.currentTarget)}
      onPointerEnter={() => onHighlight(true)}
      onPointerLeave={() => onHighlight(false)}
      onFocus={() => onHighlight(true)}
      onBlur={() => onHighlight(false)}
      aria-haspopup="dialog"
      aria-expanded={selected}
      aria-label={`${category.name}: ${category.items.join(", ")}`}
    >
      <span className="skill-string" aria-hidden="true" />
      <span className="skill-paper">
        <span className="skill-paper-heading">
          <span className="skill-paper-icon" aria-hidden="true">
            {skillIcon(category.items[0] ?? category.name)}
          </span>
          <span className="skill-paper-title" role="heading" aria-level={3}>
            {category.name}
          </span>
        </span>
        <span className="skill-paper-list">
          {category.items.map((item) => (
            <span className="skill-paper-item" key={item}>
              {item}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

function BlankSkillCard({ index, anchor }: { index: number; anchor: Point }) {
  const style = {
    left: `clamp(var(--skill-card-half, 66px), ${anchor[0] / 10}%, calc(100% - var(--skill-card-half, 66px)))`,
    top: `${(anchor[1] / 400) * 100}%`,
    "--string-length": `${42 + ((index * 19) % 34)}px`,
    "--sway-duration": `${5.8 + (index % 4) * 0.7}s`,
    "--float-duration": `${4.6 + (index % 3) * 0.8}s`,
    "--motion-delay": `${-index * 0.65}s`,
  } as CSSProperties;

  return (
    <div className="skill-hanger skill-hanger-blank" style={style} aria-hidden="true">
      <span className="skill-string" />
      <span className="skill-paper">
        <span className="skill-blank-mark">桜</span>
      </span>
    </div>
  );
}

function BranchRow({
  categories,
  row,
  compact,
  onSelect,
  selectedCategoryName,
}: {
  categories: (SkillCategory | null)[];
  row: number;
  compact: boolean;
  onSelect: (category: SkillCategory, trigger: HTMLButtonElement) => void;
  selectedCategoryName: string | null;
}) {
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);
  const anchors = getAnchorPoints(categories.length, row, compact);
  const cardAnchors = anchors.slice(1, -1);
  const path = getRopePath(anchors);

  return (
    <div className={`skill-branch-row skill-branch-count-${categories.length}`} data-row={row}>
      <svg
        className="skill-branch-svg"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="skill-rope-shadow" d={path} />
        <path className="skill-rope-bark" d={path} />
        <path className="skill-rope" d={path} />
        <path className="skill-rope-highlight" d={path} />
        <path className="skill-sap-pulse" pathLength="1000" d={path} />
        {cardAnchors.map(([x, y], index) =>
          index % 2 === row % 2 ? (
            <g
              className="skill-branch-bud"
              key={`bud-${x}`}
              transform={`translate(${x + (index % 2 === 0 ? -28 : 28)} ${y - 12})`}
            >
              <path d="M0 0c-4-7-3-11 1-14 4 4 4 9-1 14Z" />
              <circle cx="0" cy="0" r="1.6" />
            </g>
          ) : null,
        )}
        {cardAnchors.map(([x, y], index) => (
          <g
            className={`skill-knot${highlightedCard === index || categories[index]?.name === selectedCategoryName ? " skill-knot-active" : ""}`}
            key={x}
            transform={`translate(${x} ${y})`}
          >
            <circle className="skill-knot-shadow" r="10" />
            <circle className="skill-knot-core" r="6.5" />
            <circle className="skill-knot-highlight" cx="-1.5" cy="-2" r="1.5" />
          </g>
        ))}
      </svg>
      {categories.map((category, index) =>
        category ? (
          <SkillCard
            key={category.name}
            category={category}
            index={index + row}
            anchor={cardAnchors[index]}
            selected={selectedCategoryName === category.name}
            highlighted={highlightedCard === index}
            onToggle={onSelect}
            onHighlight={(active) => setHighlightedCard(active ? index : null)}
          />
        ) : (
          <BlankSkillCard key="blank-skill-card" index={index + row} anchor={cardAnchors[index]} />
        ),
      )}
    </div>
  );
}

export function SkillBranch({ categories }: { categories: SkillCategory[] }) {
  const branchesRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const branches = branchesRef.current;
    if (!branches) return;

    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            branches.classList.toggle("skills-in-view", entry.isIntersecting);
          });
    intersectionObserver?.observe(branches);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(([entry]) => {
            branches.style.setProperty("--skill-ambient-height", `${entry.contentRect.height}px`);
          });
    resizeObserver?.observe(branches);

    return () => {
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateItemsPerRow = () => {
      setItemsPerRow(getItemsPerRow(window.innerWidth));
    };
    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);

    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      triggerRef.current?.focus();
      triggerRef.current = null;
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCategory(null);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = document.querySelectorAll<HTMLElement>(
        ".skill-expanded-dialog button, .skill-expanded-dialog [href], .skill-expanded-dialog [tabindex]:not([tabindex='-1'])",
      );
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCategory]);

  const rows: (SkillCategory | null)[][] = [];
  for (let index = 0; index < categories.length; index += itemsPerRow) {
    rows.push(categories.slice(index, index + itemsPerRow));
  }
  const finalRow = rows.at(-1);
  if (itemsPerRow > 1 && finalRow && finalRow.length > 0 && finalRow.length < itemsPerRow) {
    finalRow.splice(Math.floor(finalRow.length / 2), 0, null);
  }

  const handleSelect = (category: SkillCategory, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedCategory(category);
  };

  const closeDialog = () => setSelectedCategory(null);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeDialog();
  };

  return (
    <div ref={branchesRef} className="skill-branches">
      <div className="skill-ambient" aria-hidden="true">
        <span className="skill-ambient-petal petal-one" />
        <span className="skill-ambient-petal petal-two" />
        <span className="skill-ambient-petal petal-three" />
        <span className="skill-ambient-petal petal-four" />
        <span className="skill-ambient-petal petal-five" />
        <span className="skill-ambient-petal petal-six" />
      </div>
      {rows.map((rowLeaves, index) => (
        <BranchRow
          key={rowLeaves.find((category) => category)?.name ?? index}
          categories={rowLeaves}
          row={index}
          compact={itemsPerRow <= 2}
          onSelect={handleSelect}
          selectedCategoryName={selectedCategory?.name ?? null}
        />
      ))}
      {selectedCategory &&
        createPortal(
          <div className="skill-expanded-backdrop" onClick={closeDialog}>
            <div
              className="skill-expanded-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-expanded-title"
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={handleDialogKeyDown}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="skill-expanded-close"
                aria-label="Close expanded skill card"
                onClick={closeDialog}
              >
                ×
              </button>
              <div className="skill-expanded-heading">
                <span className="skill-expanded-icon" aria-hidden="true">
                  {skillIcon(selectedCategory.items[0] ?? selectedCategory.name)}
                </span>
                <h3 id="skill-expanded-title">{selectedCategory.name}</h3>
              </div>
              <ul className="skill-expanded-list">
                {selectedCategory.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
