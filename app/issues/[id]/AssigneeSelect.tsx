"use client";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "null" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes couldn't be saved");
      });
  };

  if (error) return null;
  if (isLoading) return <Skeleton className="h-5 w-full" />;
  else
    return (
      <div className="w-full">
        <Toaster />
        <Select.Root
          defaultValue={issue?.assignedToUserId || ""}
          onValueChange={assignIssue}
        >
          <Select.Trigger
            variant="surface"
            className="w-full"
            placeholder="Assign User"
          />
          <Select.Content className="w-full mx-2">
            <Select.Group>
              <Select.Label>Select user</Select.Label>
              <Select.Item
                value={"null"}
                className="bg-red-200 hover:bg-red-400 transition-all hover:text-white my-1"
              >
                <p className="max-w-[250px]">Unassign</p>
              </Select.Item>
              {users?.map((u) => (
                <Select.Item key={u.id} value={u.id}>
                  <p className="max-w-[250px]">
                    {u.name ? u.name : u.email.split("@")[0]}
                  </p>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 10 * 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
