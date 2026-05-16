import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import { MarkdownContent } from "../components/site/MarkdownContent";
import { Post } from "../components/Post";
import { getAllPosts } from "../lib/legacy-content";

const staticPages = {
  about: {
    title: "About",
    description:
      "About Maksim Ivanov, a full-stack developer working across Go, Python, JavaScript, TypeScript, and Flutter.",
    searchable: true,
    content: `# Hey, Nice To Meet You!

My name is Maksim Ivanov. I am a full-stack developer working across Go, Python, JavaScript, TypeScript, and Flutter codebases.

These days I work at [Massive](https://usemassive.com/), where I maintain and evolve production systems across several stacks. I am also building [Mont](https://usemont.com/), a video editor with built-in slides for workflows that need to stay editable after recording: presentations, onboardings with animated clicks, product walkthroughs, and similar material.

Before that I worked on the collections system and internal editor-facing pages at Spotify, Minecraft and Minecraft Dungeons web services at Mojang, and in-game UI for Battlefield V.

This site keeps my recovered articles about React, JavaScript, TypeScript, Git, and practical software development, along with selected [projects](/projects/) such as Mont, courses, and books.

You can find me on [LinkedIn](https://www.linkedin.com/in/mivanovm/), [GitHub](https://github.com/satansdeer), [Twitter](https://twitter.com/satansdeer), and [YouTube](https://www.youtube.com/user/satansdeer1/videos).`,
  },
  articles: {
    title: "Articles",
    description: "Maksim Ivanov article archive.",
    postsList: true,
  },
  books: {
    title: "Books",
    description: "Books and longer-form writing by Maksim Ivanov.",
    searchable: true,
    content: `# Books

Longer-form material and project pages are being rebuilt into the static archive.

Start with [Command Line Git](/projects/command-line-git/), my beginner-friendly book about using Git from the command line.`,
  },
};

const StaticPage = ({ page, posts }) => {
  const pagefindProps = page.searchable ? { "data-pagefind-body": true } : {};

  return (
    <>
      <Head>
        <title>{page.title} | Maksim Ivanov</title>
        <meta name="description" content={page.description} />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article
            className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20"
            {...pagefindProps}
          >
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              {page.postsList ? (
                <>
                  <h1>{page.title}</h1>
                  <p>
                    <Link legacyBehavior href="/posts/">
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
