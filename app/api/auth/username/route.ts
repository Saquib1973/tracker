// auth/username/route.ts

import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { username, email }: { username: string; email: string } =
    await request.json();

  try {
    if (!email) {
      return NextResponse.json({ error: "User not authenticated" });
    }

    // Update the username for the authenticated user
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { name: username },
    });

    return NextResponse.json({
      success: true,
      message: "Username updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update username" });
  }
}
