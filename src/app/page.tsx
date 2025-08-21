import BlogpostCard from "@/components/BlogpostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      blogId: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
    },
  });
  return data;
}

export default function Home() {
  return (
    <main>
      <div className="py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>

<Suspense fallback={<p></p>} >
        <BlogPosts/></Suspense>
      </div>
    </main>
  );
}

async function BlogPosts(){
  const data = await getData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <BlogpostCard data={item} key={item.blogId} />
          ))}
        </div>
  )
}
