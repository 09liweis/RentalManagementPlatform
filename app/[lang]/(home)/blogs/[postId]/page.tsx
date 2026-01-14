"use client";
import BlogPost from "@/components/blog/BlogPost";
import { use } from "react";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; postId: string }>;
}) {
  const { postId } = use(params);
  return (
    <BlogPost postId={postId} />
  );
}
