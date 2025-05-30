export default function BlogPostCard({ flex = false, post, featured = false }) {
    return (
        <article className={`group relative ${featured ? "h-full" : ""}`}>
            <a href="#" className={`block ${flex && "flex gap-4 "}`}>
                <div
                    className={`relative aspect-video overflow-hidden rounded-lg ${
                        flex && "aspect-square  w-1/2"
                    } `}
                >
                    <img
                        src={`/api/posts/media/${post?.image}`}
                        alt={post?.name}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                            flex && "h-full w-full"
                        } `}
                    />
                </div>
                <div className={`mt-4 space-y-2 ${flex && "w-1/2 mt-0 gap-6"}`}>
                    <span className="customtext-primary font-medium">
                        {post?.category.name}
                    </span>
                    <h3 className="text-xl font-semibold group-hover:customtext-primary">
                        {post?.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                        {post?.summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <time>{post?.post_date}</time>

                        <span>•</span>
                        <span>Leído hace 5 minutos</span>
                    </div>
                </div>
            </a>
        </article>
    );
}
