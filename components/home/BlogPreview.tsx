"use client";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import LinkText from "@/components/common/LinkText";

interface BlogPreviewProps {
  lang: string;
}

export default function BlogPreview({ lang }: BlogPreviewProps) {
  const latestPosts = blogPosts.filter(p => !p.featured).slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Blog
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            {lang === "zh-CN" ? "最新文章" : "Latest Articles"}
          </h2>
          <p className="mt-3 text-gray-500">
            {lang === "zh-CN"
              ? "物业管理技巧与行业洞察"
              : "Property management tips and industry insights"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <LinkText href={`/blogs/${post.id}`} className="block group">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all">
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              </LinkText>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-10"
        >
          <LinkText
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            {lang === "zh-CN" ? "查看全部文章" : "View all articles"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </LinkText>
        </motion.div>
      </div>
    </section>
  );
}
