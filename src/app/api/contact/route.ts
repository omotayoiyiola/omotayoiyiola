import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 160).toLowerCase();
    const message = cleanText(body.message, 3000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "A valid email address is required" },
        { status: 400 }
      );
    }

    await prisma.contactMe.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Contact message failed:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
