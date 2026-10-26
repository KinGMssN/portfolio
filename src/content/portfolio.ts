// Edit everything here — all portfolio copy lives in this file.
export const profile = {
  name: "dev.Mohith",
  fullName: "Polipalli Mohith Sai Satyanarayana",
  kanji: "桜",
  role: "Aspiring Data Analyst",
  intro: "Aspiring Data Analyst turning raw data into clear, quiet insight.",
  statement:
    "Python, SQL and Power BI — cleaning, exploring and visualising data to support better decisions.",
  about:
    "I am an aspiring Data Analyst with knowledge of Python, SQL, Excel, Power BI, and PostgreSQL. I have experience in data cleaning, preprocessing, exploratory data analysis, data visualization, and dashboard development. I enjoy analyzing datasets, identifying trends, generating business insights, and supporting data-driven decision-making.",
  email: "mrmohith001@gmail.com",
  location: "Visakhapatnam, Andhra Pradesh, India",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Programming & Databases", items: ["Python", "SQL", "PostgreSQL"] },
  { group: "Generative AI / LLM", items: ["LLMs", "Prompt Engineering", "LLM APIs", "LangChain"] },
  {
    group: "Data Analysis & Visualization",
    items: [
      "Pandas",
      "NumPy",
      "Data Cleaning",
      "Data Preprocessing",
      "Exploratory Data Analysis",
      "Snowflake",
      "Databricks",
      "Matplotlib",
      "Seaborn",
      "Power BI",
      "Excel",
      "Google Sheets",
    ],
  },
  {
    group: "Frameworks & Development",
    items: [
      "Flask",
      "REST APIs",
      "SciPy",
      "Jupyter Notebook",
      "VS Code",
      "Google Colab",
      "Git",
      "GitHub",
    ],
  },
];

export const projects = [
  {
    title: "Zepto Retail Data Analysis",
    year: "SQL",
    tags: ["SQL", "Retail"],
    summary:
      "Investigated pricing, discounts, inventory availability and product categories in retail product data.",
    detail:
      "Analyzed retail product data using SQL, identifying patterns and generating actionable business insights.",
    githubUrl: "https://github.com/KinGMssN/Zepto-Retail-Data-Analysis",
  },
  {
    title: "Blinkit Sales Analysis",
    year: "Power BI",
    tags: ["Power BI", "DAX"],
    summary: "End-to-end analysis with an interactive Power BI dashboard.",
    detail:
      "Data cleaning, preprocessing, DAX calculations, KPI tracking and dashboard development to analyze sales performance, product categories, outlet types, customer ratings and business trends.",
    githubUrl: "https://github.com/KinGMssN/Blinkit-Sales-Analysis",
  },
  {
    title: "Sales Data Cleaning & Modeling",
    year: "Modeling",
    tags: ["Star Schema", "Galaxy Schema"],
    summary: "Cleaned and transformed raw sales data from scratch.",
    detail:
      "Designed Star and Galaxy schemas and structured datasets for efficient querying, reporting and downstream analytics.",
    githubUrl: "https://github.com/KinGMssN/Sales-Data-Cleaning-Modeling",
  },
];

export const education = [
  {
    degree: "BS in Data Science",
    institution: "Indian Institute of Technology Madras",
    mode: "Hybrid",
    modeLabel: "Hybrid Learning",
    duration: "2025 – Present",
    number: "01",
  },
  {
    degree: "B.Tech in Computer Science and Engineering (CSE)",
    institution: "MVGR College of Engineering",
    mode: "Full-Time",
    modeLabel: "Full-Time",
    duration: "2025 – Present",
    number: "02",
  },
];

export const organizations = [
  {
    name: "FYFP",
    fullName: "For the Youth For the People",
    role: "Media SPOC",
    duration: "2026 – Present",
    description: "Handles the organization's social media accounts and digital presence.",
  },
  {
    name: "Pixels and Panels",
    fullName: "Film, Anime and Pop Culture Society",
    role: "Coordinator",
    duration: "2026 – Present",
    description: "Administers and manages the club.",
  },
  {
    name: "NCC",
    fullName: "National Cadet Corps",
    role: "Cadet",
    duration: "2022 – 2023",
    description: "Serves as a cadet in the National Cadet Corps.",
  },
];

export const socials: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohith001" },
  { label: "GitHub", href: "https://github.com/KinGMssN" },
  { label: "LeetCode", href: "https://leetcode.com/u/KinGMssN" },
];
