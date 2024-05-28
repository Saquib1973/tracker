"use client";
import { Button, Dialog, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const Form = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put("/api/auth/username", {
        username,
        email: session?.user?.email,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update username");
      }

      console.log("Username updated successfully");
    } catch (error) {
      console.error("Error updating username:");
      setError("Failed to update username");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            variant="soft"
            disabled={loading}
            className="flex text-lime-800 justify-items-center"
          >
            Change Username
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            {loading && <Spinner />}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Update your username
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            <input
              className="input-box"
              placeholder="New Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className=" flex gap-2">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type="submit">Save</Button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Form;
