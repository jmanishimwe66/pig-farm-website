import { farmLife } from "../data.ts"
import type { FarmBlogPost } from "../types.ts"

type FarmStoryCardsProps = {
  onReadMore: (post: FarmBlogPost) => void
}

export function FarmStoryCards({ onReadMore }: FarmStoryCardsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      {farmLife.posts.map((post) => (
        <article
          key={post.id}
          className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <img
            src={post.cover.src}
            alt={post.cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(15,42,30,0.55)_55%,rgba(15,42,30,0.88)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(15,42,30,0.2)_0%,rgba(15,42,30,0.72)_45%,rgba(15,42,30,0.92)_100%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 sm:p-6">
            <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase sm:text-xl">
              {post.title}
            </h3>
            <p className="mt-2 max-h-24 overflow-hidden text-sm leading-relaxed text-white/90 opacity-90 transition-all duration-300 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-24 sm:group-hover:opacity-100 sm:group-focus-within:max-h-24 sm:group-focus-within:opacity-100">
              {post.excerpt}
            </p>
            <button
              type="button"
              onClick={() => onReadMore(post)}
              className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-5 py-2.5 font-display text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition duration-300 hover:bg-white hover:text-brand focus-visible:bg-white focus-visible:text-brand"
            >
              Read more
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
