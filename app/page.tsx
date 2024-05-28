import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <div className="flex max-md:flex-col gap-4">
      <div className="flex flex-col gap-4 w-full">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <div className="w-full">
        <LatestIssue />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Tracker - Dashboard",
  description: "This is the home page of tracker",
};
