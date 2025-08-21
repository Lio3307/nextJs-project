import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogpostCard from "@/components/BlogpostCard";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <h1 className="text-2xl font-semibold">
          You must be logged in to see this page
        </h1>
        <Link className={buttonVariants()} href="/">
          Go to Home
        </Link>
      </div>
    );
  }
  const data = await getData(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href={"/dashboard/create"}>
          Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogpostCard data={item} key={item.blogId} />
        ))}
      </div>
    </div>
  );
}
