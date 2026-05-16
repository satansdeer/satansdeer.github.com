import Head from "next/head";
import { Header } from "../../components/Header";
import { Post } from "../../components/Post";
import {
  getCategories,
  getPostsByCategory,
} from "../../lib/legacy-content";

const CategoryPage = ({ category, posts }) => {
  return (
    <>
      <Head>
        <title>{category.title} Articles | Maksim Ivanov</title>
        <meta
          name="description"
          content={`${category.title} articles by Maksim Ivanov.`}
        />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article
            className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20"
            data-pagefind-ignore="all"
          >
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>{category.title}</h1>
              <div className="not-prose">
                {posts.map((post) => (
                  <div key={post.slug} className="my-10">
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const category = getCategories().find((item) => item.slug === params.category);

  if (!category) {
    return { notFound: true };
  }

  return {
    props: {
      category,
      posts: getPostsByCategory(params.category),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getCategories().map((category) => ({
      params: { category: category.slug },
    })),
    fallback: false,
  };
}
