import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    console.log("🔍 Step 1: Getting session...");
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("⛔ No session found");
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("✅ Session found:", session.user.email);

    const { topic } = await req.json();
    console.log("📝 Topic received:", topic);

    if (!topic || topic.trim().length === 0) {
      return new Response("No topic provided", { status: 400 });
    }

    const prompt = `Write a detailed seminar paper on the topic "${topic}" with the following sections:

    Introduction:

    Literature Review:

    Body:

    Conclusion:

    References:

    Please label each section clearly.`;

    console.log("🛰️ Sending request to Groq...");
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error("❌ Groq API Error:", data);
      return new Response("Groq API error", { status: 500 });
    }

    const content = data.choices[0].message.content;
    console.log("✅ Groq response received");

    // Debug print content
    console.log("📄 Raw content:", content);

    // Try flexible parsing with fallback
        const sections = {
      introduction: content.match(/\*\*Introduction\*\*\s*([\s\S]*?)\*\*Literature Review\*\*/i)?.[1]?.trim(),
      literatureReview: content.match(/\*\*Literature Review\*\*\s*([\s\S]*?)\*\*Body\*\*/i)?.[1]?.trim(),
      body: content.match(/\*\*Body\*\*\s*([\s\S]*?)\*\*Conclusion\*\*/i)?.[1]?.trim(),
      conclusion: content.match(/\*\*Conclusion\*\*\s*([\s\S]*?)\*\*References\*\*/i)?.[1]?.trim(),
      references: content.match(/\*\*References\*\*\s*([\s\S]*)/i)?.[1]?.trim(),
    };


    const { introduction, literatureReview, body, conclusion, references } = sections;

    if (!introduction || !literatureReview || !body || !conclusion || !references) {
      console.error("❌ Parsing failed: Some sections missing", sections);
      return new Response("Parsing failed: Some sections are missing", { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const seminar = await prisma.seminar.create({
      data: {
        topic,
        introduction,
        literatureReview,
        body,
        conclusion,
        references,
        user: { connect: { id: user.id } },
      },
    });

    console.log("✅ Seminar saved to DB");
    return Response.json(seminar);

  } catch (error) {
    console.error("🔥 Generate error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
