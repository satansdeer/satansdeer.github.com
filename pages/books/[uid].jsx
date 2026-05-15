import Head from "next/head";
import Link from "next/link";
import { Header } from "../../components/Header";

const books = {
  "command-line-git-everything-you-need-to-know-to-get-started": {
    title: "Command Line Git: Everything You Need To Know To Get Started",
    description: "Command line Git material by Maksim Ivanov.",
  },
};

const BookPage = ({ book }) => {
  return (
    <>
      <Head>
        <title>{book.title} | Maksim Ivanov</title>
        <meta name="description" content={book.description} />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>{book.title}</h1>
              <p>
                This longer-form page is being rebuilt. Related recovered Git
                articles are available in the archive.
              </p>
              <p>
                <Link href="/categories/git/">
                  <a>Browse Git articles</a>
                </Link>
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
  const book = books[params.uid];

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
