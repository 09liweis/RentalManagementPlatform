"use client";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import LinkText from "@/components/common/LinkText";

interface BlogPostProps {
  postId: string;
}

export default function BlogPost({ postId }: BlogPostProps) {
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Post Not Found
          </h1>
          <LinkText href="/blogs" className="text-blue-600 hover:underline">
            Back to Blogs
          </LinkText>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <LinkText href="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          ← Back to Blogs
        </LinkText>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">📖</div>
              <p className="text-gray-500">Blog Image</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {post.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-gray-700 leading-relaxed mb-8 italic border-l-4 border-blue-300 pl-6"
            >
              "{post.excerpt}"
            </motion.p>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-gray-700 leading-relaxed mb-6">
                {post.content}
              </p>

              {/* Placeholder for more content */}
              <p className="text-gray-700 leading-relaxed mb-6">
                This is where the full blog post content would go. In a real application, you would fetch the complete article content from a CMS or database.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Stay tuned for more insights and tips on managing your rental properties effectively!
              </p>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-sm font-medium text-gray-600 mb-4">
                Share this article:
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center"
                  title="Share on Twitter"
                >
                  𝕏
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"
                  title="Share on Facebook"
                >
                  f
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center"
                  title="Share on LinkedIn"
                >
                  in
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center"
                  title="Copy Link"
                >
                  🔗
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== postId && !p.featured)
              .slice(0, 2)
              .map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <LinkText href={`/blogs/${relatedPost.id}`} className="block group">
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </LinkText>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
