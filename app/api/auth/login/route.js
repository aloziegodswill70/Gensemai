import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.NEXTAUTH_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ message: "Logged in", token }, { status: 200 });
  res.headers.set("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);
  return res;
}
