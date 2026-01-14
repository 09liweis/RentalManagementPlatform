"use client";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import LinkText from "@/components/common/LinkText";

export default function BlogFeatured() {
  const featuredPost = blogPosts.find(post => post.featured);

  if (!featuredPost) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <LinkText href={`/blogs/${featuredPost.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
            Featured
          </div>

          {/* Placeholder Image */}
          <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-gray-500">Blog Image</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {featuredPost.category}
              </span>
              <span className="text-gray-500 text-sm">
                {featuredPost.readTime}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {featuredPost.title}
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {featuredPost.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {featuredPost.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {featuredPost.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <motion.span
                whileHover={{ x: 5 }}
                className="text-blue-600 font-semibold group-hover:text-blue-700"
              >
                Read More →
              </motion.span>
            </div>
          </div>
        </div>
      </LinkText>
    </motion.div>
  );
}
