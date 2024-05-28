"use client";
import { Status } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateStatus = ({ issueId }: { issueId: number }) => {
  const [status, setStatus] = useState<Status | "">("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`/api/issues/${issueId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [issueId]);
  const router = useRouter();
  const handleStatusChange = async (newStatus: Status | "") => {
    try {
      await axios.patch(`/api/issues/${issueId}`, { status: newStatus });
      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  if (!status) {
    return <Skeleton className="h-5 w-full" />;
  }

  return (
    <>
      <Select.Root defaultValue={status} onValueChange={handleStatusChange}>
        <Select.Trigger
          variant="surface"
          className="w-full"
          placeholder="Status"
        />
        <Select.Content>
          <Select.Item className="md:max-w-[250px]" value={Status.OPEN}>
            Open
          </Select.Item>
          <Select.Item className="md:max-w-[250px]" value={Status.IN_PROGRESS}>
            In Progress
          </Select.Item>
          <Select.Item className="md:max-w-[250px]" value={Status.CLOSED}>
            Closed
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default UpdateStatus;
