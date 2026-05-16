import Link from "next/link";
import { Header } from "../../components/Header";
import { Seo } from "../../components/Seo";
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjectUrl,
} from "../../lib/projects";
import {
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
} from "../../lib/seo";

const ProjectPage = ({ project }) => {
  const path = getProjectUrl(project);

  return (
    <>
      <Seo
        title={project.title}
        description={project.summary}
        path={path}
        type="article"
        jsonLd={[
          buildCreativeWorkJsonLd(project, path),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
            { name: project.title, path },
          ]),
        ]}
      />
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article
            className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20"
            data-pagefind-body
          >
            <header>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {project.type} - {project.status} - {project.dateLabel}
              </p>
              <h1
                className="w-full max-w-screen-md mb-6 text-3xl font-black text-slate-900 dark:text-white lg:text-6xl md:text-5xl sm:text-4xl lg:mb-8 leading-tighter"
                data-pagefind-meta="title"
              >
                {project.title}
              </h1>
            </header>
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <p>{project.summary}</p>

              <h2>My Role</h2>
              <p>{project.role}</p>

              <h2>Highlights</h2>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <h2>Postmortem</h2>
              <p>{project.postmortem}</p>

              <div className="not-prose mt-10 flex flex-wrap gap-4">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
                >
                  {project.externalLabel}
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Source page
                </a>
                {project.archiveUrl && (
                  <a
                    href={project.archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Archive lookup
                  </a>
                )}
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                External source checked: {project.lastVerifiedAt}. This page is
                the stable internal record if the external project URL changes.
              </p>
            </main>
            <nav
              className="mt-16 border-t border-slate-200 pt-8 text-slate-800 dark:border-slate-700 dark:text-slate-200"
              data-pagefind-ignore="all"
            >
              <Link legacyBehavior href="/projects/">
                <a>Back to projects</a>
              </Link>
            </nav>
          </article>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.uid);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { project },
  };
}

export async function getStaticPaths() {
  return {
    paths: getProjectSlugs().map((uid) => ({ params: { uid } })),
    fallback: false,
  };
}
