"use client";
import { Button, Heading } from "@radix-ui/themes";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Form = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data } = await axios.post("/api/auth/register", {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      provider: "credentials",
    });
    if (data.success === true) {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        callbackUrl: "/",
      });
    } else {
      formData.delete("email");
      formData.delete("username");
    }
  };
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") router.push("/");
  else
    return (
      <div className="max-w-[350px] mx-auto flex flex-col gap-4 items-center mt-10">
        <form
          className="flex flex-col border rounded-md p-8 gap-4 "
          onSubmit={handleSubmit}
        >
          <Heading>Sign Up</Heading>
          <p className="text-gray-400 text-sm">
            Please enter your username ,email and password
          </p>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Username</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              className="input-box"
            />
            <label className="font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input-box"
            />
            <label className="font-semibold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input-box"
            />
          </div>

          <Button>Sign Up</Button>
        </form>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              await signIn("google");
            }}
            className="flex items-center gap-2"
          >
            Sign In with Google
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              fill="#4285F4"
              className="size-4"
            >
              <g>
                <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
              </g>
            </svg>
          </button>
          {" / "}
          <Link href={"/auth/signin"}>Sign In</Link>
        </div>
      </div>
    );
};

export default Form;
