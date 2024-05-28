import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

interface SignUpFormData {
  email: string;
  password: string;
  // Add other form fields if needed
}

export async function signUp(formData: SignUpFormData) {
  try {
    const { email, password } = formData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        provider: "credentials",
        // Add other user data if needed
      },
    });
  } catch (error) {
    throw new Error("Sign up failed: ");
  }
}
