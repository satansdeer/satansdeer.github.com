import Link from "next/link";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { Seo } from "../components/Seo";
import {
  getAllPosts,
  getCategories,
  getFeaturedPosts,
} from "../lib/legacy-content";
import {
  buildCollectionPageJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from "../lib/seo";

const description =
  "Notes from building and launching Mont, with practical writing on product development, software engineering, and web development.";

const Index = ({ featuredPosts, latestPosts, categories }) => {
  return (
    <>
      <Seo
        title="Maksim Ivanov"
        description={description}
        path="/"
        jsonLd={[
          buildWebsiteJsonLd(),
          buildPersonJsonLd(),
          buildCollectionPageJsonLd({
            title: "Maksim Ivanov",
            description,
            path: "/",
          }),
        ]}
      />
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article
            className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20"
            data-pagefind-ignore="all"
          >
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>Building And Launching Mont</h1>
              <p>
                Hey, I am Maksim Ivanov. I am building Mont, a browser-based
                video editor for editable product demos, presentations, and
                onboarding videos.
              </p>
              <p>
                This site is where I share the product development journey:
                what I am shipping, how I am finding users, and the engineering
                decisions behind the launch. The archive still includes my
                React, JavaScript, TypeScript, and Git articles, but the center
                of gravity is now building and launching useful products.
              </p>
              <p>
                <Link legacyBehavior href="/posts/">
                  <a>Browse all posts</a>
                </Link>
              </p>

              <h2>Start Here</h2>
              <p>
                A few posts that match the current direction: building Mont,
                finding users, and making product demos with a video workflow
                that stays editable after recording.
              </p>
              <div className="not-prose">
                {featuredPosts.map((post) => (
                  <div key={post.slug} className="my-10">
                    <Post post={post} />
                  </div>
                ))}
              </div>

              <h2>Latest Posts</h2>
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
