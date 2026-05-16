import Head from "next/head";
import Link from "next/link";
import { Header } from "../../components/Header";
import { getProjectBySlug, getProjectCanonicalUrl } from "../../lib/projects";

const books = {
  "command-line-git-everything-you-need-to-know-to-get-started": {
    projectSlug: "command-line-git",
  },
};

const BookPage = ({ book }) => {
  return (
    <>
      <Head>
        <title>{book.title} | Maksim Ivanov</title>
        <meta name="description" content={book.summary} />
        <link rel="canonical" href={getProjectCanonicalUrl(book)} />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>{book.title}</h1>
              <p>{book.summary}</p>
              <h2>My Role</h2>
              <p>{book.role}</p>
              <h2>Highlights</h2>
              <ul>
                {book.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p>
                <Link legacyBehavior href="/projects/command-line-git/">
                  <a>Read the full project page</a>
                </Link>
              </p>
              <p>
                <a
                  href={book.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.externalLabel}
                </a>
              </p>
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default BookPage;

export async function getStaticProps({ params }) {
  const bookConfig = books[params.uid];

  if (!bookConfig) {
    return { notFound: true };
  }

  const book = getProjectBySlug(bookConfig.projectSlug);

  if (!book) {
    return { notFound: true };
  }

  return {
    props: { book },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(books).map((uid) => ({ params: { uid } })),
    fallback: false,
  };
}
