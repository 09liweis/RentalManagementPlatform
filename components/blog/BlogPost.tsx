"use client";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import LinkText from "@/components/common/LinkText";

interface BlogPostProps {
  postId: string;
}

export default function BlogPost({ postId }: BlogPostProps) {
  const post = blogPosts.find(p => p.id === postId);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // --- Not Found State ---
  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md px-4"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <LinkText
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </LinkText>
        </motion.div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && !p.featured)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* --- Hero Header --- */}
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <LinkText href="/blogs" className="hover:text-gray-600 transition-colors">
              Blog
            </LinkText>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
          </motion.nav>

          {/* Category + Read Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="inline-block px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            {post.title}
          </motion.h1>

          {/* Author Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-4 mt-8"
          >
            <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-bold ring-2 ring-white">
              {post.author.charAt(0)}
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
              <p className="text-sm text-gray-400">{formatDate(post.date)}</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- Article Body --- */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cover Image */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12 -mx-4 sm:mx-0"
        >
          <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 rounded-none sm:rounded-2xl flex items-center justify-center overflow-hidden">
            <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </motion.figure>

        {/* Excerpt / Pull Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="border-l-[3px] border-gray-900 pl-6 mb-12"
        >
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed italic">
            {post.excerpt}
          </p>
        </motion.blockquote>

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-gray-300 hover:prose-a:decoration-gray-900
            prose-strong:text-gray-900
            prose-li:text-gray-600
          ">
            <p>{post.content}</p>
            <p>
              This is where the full blog post content would go. In a real application, you would
              fetch the complete article content from a CMS or database.
            </p>
            <p>
              Stay tuned for more insights and tips on managing your rental properties effectively!
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <hr className="my-12 border-gray-100" />

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl"
        >
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">Published on {formatDate(post.date)} · {post.readTime}</p>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-10 flex items-center gap-3"
        >
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Share
          </span>
          <div className="flex gap-1.5">
            {[
              { label: "Twitter", icon: "𝕏", bg: "hover:bg-gray-100" },
              { label: "Facebook", icon: "f", bg: "hover:bg-gray-100" },
              { label: "LinkedIn", icon: "in", bg: "hover:bg-gray-100" },
              { label: "Copy Link", icon: "🔗", bg: "hover:bg-gray-100" },
            ].map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 border border-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm transition-colors ${btn.bg}`}
                title={btn.label}
              >
                {btn.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- Related Posts --- */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
                  >
                    <LinkText href={`/blogs/${related.id}`} className="block group">
                      <article className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                        <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                          {related.category}
                        </span>
                        <h3 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2">{related.readTime}</p>
                      </article>
                    </LinkText>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
