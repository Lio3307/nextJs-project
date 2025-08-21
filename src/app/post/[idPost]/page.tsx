import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPosData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      blogId: id,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function IdPost({
  params,
}: {
  params: Promise<{ idPost: string }>;
}) {
  const { idPost } = await params;
  const data = await getPosData(idPost);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants()} href="/">
        Back to post
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </p>
        </div>
      </div>

      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <Card>
        <CardContent>
            <p className="text-gray-700">{data.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
