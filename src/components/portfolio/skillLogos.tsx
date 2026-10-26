import type { ReactNode } from "react";

// Unbranded skills use theme-colored symbols; tools use genuine logo assets.
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[56%] w-[56%]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Mono({ text }: { text: string }) {
  return <span className="font-display leading-none tracking-tight" style={{ fontSize: "1.05em" }}>{text}</span>;
}

export function initials(name: string) {
  const words = name.split(/[\s&/-]+/).filter(Boolean);
  if (words.length > 1) return words.slice(0, 3).map((w) => w.charAt(0).toUpperCase()).join("");
  return name.slice(0, 2).toUpperCase();
}

const LOGOS: Record<string, string> = {
  Python: "/skill-logos/python.svg",
  PostgreSQL: "/skill-logos/postgresql.svg",
  Pandas: "/skill-logos/pandas.svg",
  NumPy: "/skill-logos/numpy.svg",
  "Power BI": "/skill-logos/powerbi.svg",
  Excel: "/skill-logos/excel.svg",
  "Google Sheets": "/skill-logos/googlesheets.svg",
  Matplotlib: "/skill-logos/matplotlib.svg",
  Seaborn: "/skill-logos/seaborn.svg",
  Snowflake: "/skill-logos/snowflake.svg",
  Databricks: "/skill-logos/databricks.svg",
  "Jupyter Notebook": "/skill-logos/jupyter.svg",
  "Google Colab": "/skill-logos/googlecolab.svg",
  "VS Code": "/skill-logos/vscode.svg",
  Git: "/skill-logos/git.svg",
  GitHub: "/skill-logos/github.svg",
  Flask: "/skill-logos/flask.svg",
  SciPy: "/skill-logos/scipy.svg",
};

const ICONS: Record<string, ReactNode> = {
  SQL: <Svg><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></Svg>,
  "REST APIs": (
    <Svg>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <ellipse cx="12" cy="12" rx="4" ry="8.5" />
    </Svg>
  ),
  "Data Cleaning": (
    <Svg>
      <path d="M12 3.5l1.6 4.9 4.9 1.6-4.9 1.6L12 16.5l-1.6-4.9-4.9-1.6 4.9-1.6z" />
      <path d="M18.8 16.2l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" opacity=".55" />
    </Svg>
  ),
  "Data Preprocessing": (
    <Svg>
      <path d="M4 4h16l-6.2 7.2V19l-3.6-2v-5.8z" />
    </Svg>
  ),
  "Exploratory Data Analysis": (
    <Svg>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5.5 5.5" />
      <path d="M7.4 12.2l2-2.6 2 1.5 2.6-3.1" opacity=".7" />
    </Svg>
  ),
  "Analytical Thinking": (
    <Svg>
      <path d="M9 18.5h6" />
      <path d="M10 21.5h4" />
      <path d="M12 2.8a6 6 0 0 1 3.5 10.8c-.7.5-1 1.3-1 2.2h-5c0-.9-.3-1.7-1-2.2A6 6 0 0 1 12 2.8z" />
    </Svg>
  ),
  "Problem-Solving": (
    <Svg>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" opacity=".6" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  Communication: (
    <Svg>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" />
      <path d="M8.5 10h7" opacity=".6" />
    </Svg>
  ),
  Teamwork: (
    <Svg>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.4" opacity=".6" />
      <path d="M3.5 20c.5-3.6 2.5-5.6 5-5.6s4.5 2 5 5.6" />
      <path d="M15 20c.3-2.6 1.7-4.4 3.9-4.4 1.6 0 2.9 1.3 3.1 4.4" opacity=".6" />
    </Svg>
  ),
  "Time Management": (
    <Svg>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  ),
  "Critical Thinking": (
    <Svg>
      <path d="M12 4v16M8 20h8" />
      <path d="M12 6l-6 2M12 6l6 2" />
      <path d="M3 13.5l3-5.5 3 5.5a3 3 0 0 1-6 0z" />
      <path d="M15 13.5l3-5.5 3 5.5a3 3 0 0 1-6 0z" />
    </Svg>
  ),
  Adaptability: (
    <Svg>
      <path d="M3 7h4l10 10h4M3 17h4M14 7h7" />
      <path d="M18 4l3 3-3 3M18 14l3 3-3 3" />
    </Svg>
  ),
  "Decision-Making": (
    <Svg>
      <path d="M12 3v18" />
      <path d="M12 6h6.5l2 2.5-2 2.5H12z" />
      <path d="M12 13H5.5l-2 2.5 2 2.5H12z" opacity=".6" />
    </Svg>
  ),
};

export function skillIcon(name: string): ReactNode {
  const logo = LOGOS[name];
  if (logo) return <img src={logo} alt="" className="h-[56%] w-[56%] object-contain" draggable={false} />;
  return ICONS[name] ?? <Mono text={initials(name)} />;
}
