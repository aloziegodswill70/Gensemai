import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashed },
    });

    return NextResponse.json({ message: "Registered", user: { email: newUser.email } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
