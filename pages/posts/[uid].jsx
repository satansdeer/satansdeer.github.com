import Link from "next/link";
import { Header } from "../../components/Header";
import { Seo } from "../../components/Seo";
import { MarkdownContent } from "../../components/site/MarkdownContent";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "../../lib/legacy-content";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
} from "../../lib/seo";

const PostPage = ({ post, previousPost, nextPost }) => {
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={post.url}
        type="article"
        image={post.image}
        publishedTime={post.date}
        modifiedTime={post.date}
        jsonLd={[
          buildBlogPostingJsonLd(post),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts/" },
            { name: post.category, path: `/categories/${post.categorySlug}/` },
            { name: post.title, path: post.url },
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
              <h1
                className="w-full max-w-screen-md mb-6 text-3xl font-black text-slate-900 dark:text-white lg:text-6xl md:text-5xl sm:text-4xl lg:mb-8 leading-tighter"
                data-pagefind-meta="title"
              >
                {post.title}
              </h1>
              <div className="mb-10 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {post.dateLabel && <span>{post.dateLabel}</span>}
                {post.category && (
                  <Link legacyBehavior href={`/categories/${post.categorySlug}/`}>
                    <a>{post.category}</a>
                  </Link>
                )}
              </div>
            </header>
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <MarkdownContent>{post.content}</MarkdownContent>
            </main>
            <nav
              className="mt-16 flex flex-col gap-6 border-t border-slate-200 pt-8 text-slate-800 dark:border-slate-700 dark:text-slate-200 sm:flex-row sm:justify-between"
              data-pagefind-ignore="all"
            >
              {previousPost ? (
                <Link legacyBehavior href={previousPost.url}>
                  <a rel="prev">Previous: {previousPost.title}</a>
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link legacyBehavior href={nextPost.url}>
                  <a rel="next">Next: {nextPost.title}</a>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostPage;

export async function getStaticProps({ params }) {
  const posts = getAllPosts();
  const index = posts.findIndex((item) => item.slug === params.uid);
  const post = getPostBySlug(params.uid);

  return {
    props: {
      post,
      previousPost: index > 0 ? posts[index - 1] : null,
      nextPost: index !== -1 && index < posts.length - 1 ? posts[index + 1] : null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map((uid) => ({ params: { uid } })),
    fallback: false,
  };
}
