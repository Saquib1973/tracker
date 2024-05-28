import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Heading, Skeleton } from "@radix-ui/themes";
import React from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AssigneeSelect from "./AssigneeSelect";

const loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="flex flex-col md:col-span-3 gap-3 w-full">
        <Skeleton className="">
          <Heading>issue.title</Heading>
        </Skeleton>
        <div className="flex gap-4 ">
          <Skeleton>issue.status</Skeleton>
          <br />
          <Skeleton>issue.createdAt.toDateString</Skeleton>
        </div>
        <Card className="prose mt-2">
          <Skeleton className="w-full">issue.description</Skeleton>
        </Card>
      </div>

      <div className="flex flex-col md:items-start gap-2">
        <EditButton issueId={1} disable={true} />
        <Skeleton className="w-full h-7" />
        <DeleteButton issueId={1} disable={true} />
      </div>
    </div>
  );
};

export default loading;
