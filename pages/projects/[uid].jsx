import Head from "next/head";
import Link from "next/link";
import { Header } from "../../components/Header";
import {
  getProjectBySlug,
  getProjectCanonicalUrl,
  getProjectSlugs,
} from "../../lib/projects";

const ProjectPage = ({ project }) => {
  const title = `${project.title} | Maksim Ivanov`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={project.summary} />
        <link rel="canonical" href={getProjectCanonicalUrl(project)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:url" content={getProjectCanonicalUrl(project)} />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <header>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {project.type} - {project.status} - {project.dateLabel}
              </p>
              <h1 className="w-full max-w-screen-md mb-6 text-3xl font-black text-slate-900 dark:text-white lg:text-6xl md:text-5xl sm:text-4xl lg:mb-8 leading-tighter">
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
            <nav className="mt-16 border-t border-slate-200 pt-8 text-slate-800 dark:border-slate-700 dark:text-slate-200">
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
