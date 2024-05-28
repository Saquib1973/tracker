import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueTools from "./IssueTools";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Metadata } from "next";

export const isValidStatus = (value: any): value is Status => {
  return Object.values(Status).includes(value);
};

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const {
    status,
    orderBy = "createdAt",
    orderDirection = "asc",
  } = searchParams;
  const validStatus = status && isValidStatus(status) ? status : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const issues = await prisma.issue.findMany({
    where: validStatus ? { status: validStatus } : {},
    orderBy: { [orderBy]: orderDirection },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: validStatus ? { status: validStatus } : {},
  });

  return (
    <div className="flex flex-col gap-2">
      <IssueTools />
      <IssueTable searchParams={searchParams} issues={issues} />
      <div className="flex w-full justify-center mt-2">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </div>
    </div>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Tracker - Issue List",
  description: "View all issues",
};
