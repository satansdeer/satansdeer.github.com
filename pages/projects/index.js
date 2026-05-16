import Head from "next/head";
import Link from "next/link";
import { Header } from "../../components/Header";
import { getAllProjects, getProjectUrl } from "../../lib/projects";

const ProjectsIndex = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Projects | Maksim Ivanov</title>
        <meta
          name="description"
          content="Selected courses, books, and products by Maksim Ivanov."
        />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>Projects</h1>
              <p>
                Selected courses, books, and products I have worked on. Each page
                keeps a short internal record of the work, with links out to the
                live project or publisher page.
              </p>
              <div className="not-prose mt-10 grid gap-6">
                {projects.map((project) => (
                  <Link legacyBehavior key={project.slug} href={getProjectUrl(project)}>
                    <a className="block rounded-lg border border-gray-200 bg-white p-6 no-underline shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div className="mb-3 flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <span>{project.type}</span>
                        <span>{project.status}</span>
                        <span>{project.dateLabel}</span>
                      </div>
                      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {project.title}
                      </h2>
                      <p className="m-0 text-slate-700 dark:text-slate-300">
                        {project.summary}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default ProjectsIndex;

export async function getStaticProps() {
  return {
    props: {
      projects: getAllProjects(),
    },
  };
}
