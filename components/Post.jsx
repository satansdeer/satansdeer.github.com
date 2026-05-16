import Link from "next/link";

export const Post = ({ post }) => {
  return (
    <Link legacyBehavior href={post.url}>
      <a className="block group p-6 rounded-lg border border-gray-200 shadow-md no-underline bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h3 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <div className="mb-3 flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {post.dateLabel && <span>{post.dateLabel}</span>}
          {post.category && <span>{post.category}</span>}
        </div>
        {post.excerpt && (
          <p className="m-0 text-slate-700 dark:text-slate-300">{post.excerpt}</p>
        )}
      </a>
    </Link>
  );
};
