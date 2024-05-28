import prisma from "@/prisma/client";
import { Avatar, Card, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "./components/IssueStatusBadge";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading className="mb-2 ml-2">Latest Issue</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue.id}`}
                  className="flex justify-between items-center "
                >
                  <p className="flex flex-col gap-1 items-start text-xs">
                    {issue.title}
                    <IssueStatusBadge status={issue.status} />
                  </p>
                  {issue.assignedToUser ? (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      className="rounded-full size-7"
                      fallback="?"
                    />
                  ) : (
                    <p className="text-[8px]">Not assigned</p>
                  )}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
