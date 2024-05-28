"use client";
import { AlertDialog, Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({
  issueId,
  disable = false,
}: {
  issueId: number;
  disable?: boolean;
}) => {
  const [del, setDel] = useState(false);
  const [err, setErr] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setDel(true);
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setErr(true);
      console.log(error);
    }
    setDel(false);
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            disabled={del || disable}
            color="red"
            variant="solid"
            className="flex items-center justify-center gap-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Delete {del && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="max-w-[450px]">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description className="text-sm -mt-1">
            Are you sure? You will delete the issue permanently.
          </AlertDialog.Description>

          <div className="flex gap-2 mt-3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                disabled={del}
                onClick={handleDelete}
              >
                Delete {del && <Spinner />}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={err}>
        <AlertDialog.Content>
          <AlertDialog.Title>Something went wrong</AlertDialog.Title>
          <AlertDialog.Description>
            Couldn&apos;t delete the issue. Please try again.
          </AlertDialog.Description>
          <div className="flex gap-2 mt-3 justify-end">
            <AlertDialog.Action>
              <Button
                variant="surface"
                color="red"
                onClick={() => setErr(false)}
              >
                Close
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
