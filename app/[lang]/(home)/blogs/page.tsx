'use client';
import BlogList from "@/components/blog/BlogList";
import BlogFeatured from "@/components/blog/BlogFeatured";

export default function Blogs() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog & Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, guides, and insights for landlords to manage properties efficiently
          </p>
        </div>

        {/* Featured Article */}
        <BlogFeatured />

        {/* Blog List */}
        <BlogList />
      </div>
    </div>
  );
}
