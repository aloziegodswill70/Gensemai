import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import cloudinary from "cloudinary";

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("avatar");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: "gensem-avatars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { avatar: upload.secure_url },
    });

    return new Response(JSON.stringify({ avatar: updatedUser.avatar }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Server Error", { status: 500 });
  }
}
