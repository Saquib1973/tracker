import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const {
      username,
      email,
      password,
      provider,
    }: { username: string; email: string; password: string; provider: string } =
      await request.json();

    if (provider !== "credentials") {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
