"use client";
import BlogPost from "@/components/blog/BlogPost";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; postId: string }>;
}) {
  return (
    <BlogPost postId={(params as any).postId} />
  );
}
