import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import { MarkdownContent } from "../components/site/MarkdownContent";
import { Post } from "../components/Post";
import { getAllPosts } from "../lib/legacy-content";

const staticPages = {
  about: {
    title: "About",
    description: "About Maksim Ivanov.",
    content: `# Hey, Nice To Meet You!

My name is Maksim Ivanov. I am a frontend developer focused on React, TypeScript, JavaScript, and practical web development.

I have worked on admin interfaces for Spotify, web services around Minecraft and Minecraft Dungeons, and in-game UI for Battlefield V.

You can find me on [GitHub](https://github.com/satansdeer), [Twitter](https://twitter.com/satansdeer), and [YouTube](https://www.youtube.com/user/satansdeer1/videos).`,
  },
  articles: {
    title: "Articles",
    description: "Maksim Ivanov article archive.",
    postsList: true,
  },
  books: {
    title: "Books",
    description: "Books and longer-form writing by Maksim Ivanov.",
    content: `# Books

Longer-form material is being rebuilt into the static archive.

For now, the recovered article archive is available under [Posts](/posts/).`,
  },
};

const StaticPage = ({ page, posts }) => {
  return (
    <>
      <Head>
        <title>{page.title} | Maksim Ivanov</title>
        <meta name="description" content={page.description} />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20">
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              {page.postsList ? (
                <>
                  <h1>{page.title}</h1>
                  <p>
                    <Link href="/posts/">
                      <a>Browse the full recovered archive.</a>
                    </Link>
                  </p>
                  <div className="not-prose">
                    {posts.map((post) => (
                      <div key={post.slug} className="my-10">
                        <Post post={post} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <MarkdownContent>{page.content}</MarkdownContent>
              )}
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default StaticPage;

export async function getStaticProps({ params }) {
  const page = staticPages[params.uid];

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
      posts: page.postsList ? getAllPosts() : [],
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(staticPages).map((uid) => ({ params: { uid } })),
    fallback: false,
  };
}
