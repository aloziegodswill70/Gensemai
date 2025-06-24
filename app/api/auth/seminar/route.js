import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return new Response("Unauthorized", { status: 401 });

  const seminars = await prisma.seminar.findMany({
    where: { userId: token.id },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(seminars), { status: 200 });
}
