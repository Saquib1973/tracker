import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log({ credentials });

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (user) {
          if (!user.password) {
            throw new Error("This account does not support password login");
          }
          const passwordCorrect = await compare(
            credentials.password,
            user.password!
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};
