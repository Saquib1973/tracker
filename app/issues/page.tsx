import prisma from "@/prisma/client";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery } from "./IssueTable";
import IssueTools from "./IssueTools";
import { Suspense } from "react";

// Helper function to fetch issues and issue count
const fetchIssues = async (searchParams: IssueQuery) => {
  const {
    status,
    orderBy = "createdAt",
    orderDirection = "asc",
    page = "1",
  } = searchParams;
  const currentPage = parseInt(page) || 1;
  const pageSize = 5;

  let issues, issueCount;
  if (status === "CLOSED" || status === "IN_PROGRESS" || status === "OPEN") {
    issues = await prisma.issue.findMany({
      where: { status },
      orderBy: { [orderBy]: orderDirection },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    issueCount = await prisma.issue.count({
      where: { status },
    });
  } else {
    issues = await prisma.issue.findMany({
      where: {},
      orderBy: { [orderBy]: orderDirection },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    issueCount = await prisma.issue.count({
      where: {},
    });
  }

  return { issues, issueCount, currentPage, pageSize };
};

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const { issues, issueCount, currentPage, pageSize } = await fetchIssues(
    searchParams
  );

  return (
    <div className="flex flex-col gap-2">
      <IssueTools />
      <IssueTable searchParams={searchParams} issues={issues} />
      <div className="flex w-full justify-center mt-2">
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemCount={issueCount}
        />
      </div>
    </div>
  );
};

const IssuesPageWrapper = ({ searchParams }: { searchParams: IssueQuery }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <IssuesPage searchParams={searchParams} />
  </Suspense>
);

export default IssuesPageWrapper;

export const metadata: Metadata = {
  title: "Tracker - Issue List",
  description: "View all issues",
};
