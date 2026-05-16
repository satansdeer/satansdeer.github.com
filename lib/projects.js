const SITE_URL = "https://maksimivanov.com";

const projects = [
  {
    slug: "notion-clone-react-typescript",
    title: "Build a Notion Clone with React and TypeScript",
    type: "Course project",
    status: "Published",
    dateLabel: "Updated May 2026",
    externalUrl:
      "https://zerotomastery.io/courses/react-project-ideas-notion-clone/#overview",
    sourceUrl:
      "https://zerotomastery.io/courses/react-project-ideas-notion-clone/#overview",
    archiveUrl:
      "https://web.archive.org/web/*/https://zerotomastery.io/courses/react-project-ideas-notion-clone/",
    lastVerifiedAt: "2026-05-16",
    externalLabel: "View the ZTM project",
    summary:
      "A practical React and TypeScript course built around a Notion-style application. The project teaches a realistic full-stack workflow with Vite, Supabase, authentication, database-backed content, drag-and-drop interactions, testing, and CSS Modules.",
    role:
      "I taught the project for Zero To Mastery and structured it around a portfolio-worthy app rather than isolated framework examples.",
    highlights: [
      "8 hours of material across 112+ lessons.",
      "Covers React, TypeScript, React Router, DNDKit, Vite, Supabase, testing, and CSS Modules.",
      "Uses authentication, private routes, persisted data, and interactive document-building UI patterns.",
    ],
    postmortem:
      "The useful constraint here was forcing TypeScript to earn its place in the product, not just annotating a toy app. The course works best when the project complexity is high enough to make state shape, data ownership, and UI interactions visible to the learner.",
  },
  {
    slug: "fullstack-react-with-typescript",
    title: "Fullstack React with TypeScript",
    type: "Course and book",
    status: "Published",
    dateLabel: "Available now",
    externalUrl: "https://www.newline.co/fullstack-react-with-typescript",
    sourceUrl: "https://www.newline.co/fullstack-react-with-typescript",
    archiveUrl:
      "https://web.archive.org/web/*/https://www.newline.co/fullstack-react-with-typescript",
    lastVerifiedAt: "2026-05-16",
    externalLabel: "View the newline course",
    summary:
      "A long-form React and TypeScript learning resource published by newline. It combines a self-paced video masterclass with a 500+ page ebook and focuses on production React patterns across hooks, testing, Redux, server-side rendering, GraphQL, and larger example applications.",
    role:
      "I taught the 10+ hour video masterclass and contributed to a format that pairs guided implementation with durable written reference material.",
    highlights: [
      "Includes a 10+ hour self-paced video masterclass and a 500+ page ebook.",
      "Builds several applications, including Trello-style, Medium-style, and digital-item ecommerce examples.",
      "Connects React and TypeScript fundamentals to ecosystem decisions around testing, Redux, SSR, and GraphQL.",
    ],
    postmortem:
      "The core challenge was balancing breadth with usefulness. TypeScript with React touches almost every layer of a frontend stack, so the material had to show repeatable patterns without pretending there is one universal architecture for every app.",
  },
  {
    slug: "command-line-git",
    title: "Command Line Git",
    type: "Book",
    status: "Published",
    dateLabel: "Released September 7, 2023",
    externalUrl:
      "https://www.amazon.com/Command-Line-Git-Everything-started/dp/B0CKNP8TVT",
    sourceUrl:
      "https://books.apple.com/ca/book/command-line-git-everything-you-need-to-know-to-get-started/id6468110059",
    archiveUrl:
      "https://web.archive.org/web/*/https://www.amazon.com/Command-Line-Git-Everything-started/dp/B0CKNP8TVT",
    lastVerifiedAt: "2026-05-16",
    externalLabel: "View the book on Amazon",
    summary:
      "A beginner-friendly book about using Git from the command line. It focuses on getting developers productive without overwhelming them, using mental models, illustrations, and exercises to explain version control, commits, branches, remotes, and the day-to-day Git workflow.",
    role:
      "I wrote and published the book for developers who need practical Git fluency across Windows, macOS, and Linux.",
    highlights: [
      "Explains command-line Git for Windows, macOS, and Linux.",
      "Uses mental models, analogies, visual explanations, and exercises to make Git concepts easier to retain.",
      "Frames Git as both a personal history tool and a collaboration tool for real software projects.",
    ],
    postmortem:
      "The important editorial decision was to keep the scope intentionally narrow. Git is huge, but a beginner does not need every command and flag. They need a working model of what Git is doing and enough command-line confidence to recover when something looks confusing.",
  },
  {
    slug: "use-mont",
    title: "Mont",
    type: "Product",
    status: "Launching",
    dateLabel: "Public page live",
    externalUrl: "https://usemont.com/",
    sourceUrl: "https://usemont.com/",
    archiveUrl: "https://web.archive.org/web/*/https://usemont.com/",
    lastVerifiedAt: "2026-05-16",
    externalLabel: "Visit Use Mont",
    summary:
      "A video editor I am building around editable presentation and onboarding workflows. Mont combines video editing with built-in slides so recorded material can stay flexible after the first take.",
    role:
      "I am building the product and shaping the workflow around videos that need to be revised, reused, and kept current over time.",
    highlights: [
      "Built around recordings that are easy to update later, such as presentations and product walkthroughs.",
      "Includes slide-based editing as a first-class part of the video workflow.",
      "Supports onboarding-style material with animated clicks and other structured interactions.",
    ],
    postmortem:
      "The product direction is to treat videos as living documents rather than one-off recordings. That keeps the project page focused on the workflow and positioning while the public launch page continues to evolve.",
  },
];

function getAllProjects() {
  return projects;
}

function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

function getProjectUrl(project) {
  return `/projects/${project.slug}/`;
}

function getProjectCanonicalUrl(project) {
  return `${SITE_URL}${getProjectUrl(project)}`;
}

module.exports = {
  SITE_URL,
  getAllProjects,
  getProjectBySlug,
  getProjectCanonicalUrl,
  getProjectSlugs,
  getProjectUrl,
};
