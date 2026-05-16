import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import {
  getAllPosts,
  getCategories,
  getFeaturedPosts,
} from "../lib/legacy-content";

const Index = ({ featuredPosts, latestPosts, categories }) => {
  return (
    <>
      <Head>
        <title>Maksim Ivanov</title>
        <meta
          name="description"
          content="Frontend developer tutorials on React, JavaScript, TypeScript, Git, and web development."
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
              <h1>Improve Your Frontend Skills</h1>
              <p>
                Hey, I am Maksim Ivanov. This site collects my recovered
                frontend tutorials, mostly around React, JavaScript,
                TypeScript, Git, and practical web development.
              </p>
              <p>
                <Link legacyBehavior href="/posts/">
                  <a>Browse all posts</a>
                </Link>
              </p>

              <h2>Recommended Articles</h2>
              <div className="not-prose">
                {featuredPosts.map((post) => (
                  <div key={post.slug} className="my-10">
                    <Post post={post} />
                  </div>
                ))}
              </div>

              <h2>Latest Recovered Posts</h2>
              <div className="not-prose">
                {latestPosts.map((post) => (
                  <div key={post.slug} className="my-10">
                    <Post post={post} />
                  </div>
                ))}
              </div>

              <h2>Categories</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link legacyBehavior href={`/categories/${category.slug}/`}>
                      <a>
                        {category.title} ({category.count})
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      featuredPosts: getFeaturedPosts(),
      latestPosts: posts.slice(0, 8),
      categories: getCategories(),
    },
  };
}
