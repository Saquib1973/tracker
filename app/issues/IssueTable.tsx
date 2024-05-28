import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  page: string;
  status?: Status;
  orderBy?: keyof Issue;
  orderDirection?: "asc" | "desc";
}
export const columns: {
  label: string;
  value: keyof Issue;
  classname?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", classname: "hidden md:table-cell" },
];
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  const { orderBy = "createdAt", orderDirection = "asc" } = searchParams;
  return (
    <Table.Root variant="surface" className="mt-4">
      <Table.Header className="bg-gray-200">
        <Table.Row>
          {columns.map((column, i) => (
            <Table.ColumnHeaderCell key={i} className={column.classname}>
              <div className="flex items-center">
                <Link
                  href={{
                    pathname: "/issues",
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      orderDirection:
                        orderBy === column.value && orderDirection === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === orderBy && (
                  <Arrow direction={orderDirection} />
                )}
              </div>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row
            key={issue.id}
            className="hover:bg-lime-50 transition-colors group"
          >
            <Table.Cell className="flex w-full justify-between">
              <Link
                href={`issues/${issue.id}`}
                className="hover:underline underline-offset-4 group-hover:text-lime-800 transition-all"
              >
                {issue.title}
              </Link>
              <div className="md:hidden text-xs mr-20">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell group-hover:text-lime-800">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;

const Arrow = ({ direction }: { direction: "asc" | "desc" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3 mb-0.5 inline"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={
        direction === "asc"
          ? "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          : "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      }
    />
  </svg>
);
