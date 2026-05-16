import { Header } from "../../components/Header";
import { Post } from "../../components/Post";
import { Seo } from "../../components/Seo";
import {
  getCategories,
  getPostsByCategory,
} from "../../lib/legacy-content";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "../../lib/seo";

const CategoryPage = ({ category, posts }) => {
  const title = `${category.title} Articles`;
  const description = `${category.title} articles by Maksim Ivanov.`;
  const path = `/categories/${category.slug}/`;

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={[
          buildCollectionPageJsonLd({ title, description, path }),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Posts", path: "/posts/" },
            { name: category.title, path },
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
