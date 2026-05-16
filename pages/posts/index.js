import Link from "next/link";
import { Header } from "../../components/Header";
import { Post } from "../../components/Post";
import { Seo } from "../../components/Seo";
import { getAllPosts, getCategories } from "../../lib/legacy-content";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "../../lib/seo";

const description =
  "Recovered Maksim Ivanov articles about React, JavaScript, TypeScript, Git, and frontend development.";

const PostsIndex = ({ posts, categories }) => {
  return (
    <>
      <Seo
        title="Posts"
        description={description}
        path="/posts/"
        jsonLd={[
          buildCollectionPageJsonLd({
            title: "Posts",
            description,
            path: "/posts/",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts/" },
          ]),
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
              <h1>Posts</h1>
              <div className="not-prose mb-10 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link legacyBehavior key={category.slug} href={`/categories/${category.slug}/`}>
                    <a className="rounded border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      {category.title} ({category.count})
                    </a>
                  </Link>
                ))}
              </div>
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

export default PostsIndex;

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
      categories: getCategories(),
    },
  };
}
