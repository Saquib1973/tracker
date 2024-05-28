import { Status } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issue", value: open, status: "OPEN" },
    { label: "InProgress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issue", value: closed, status: "CLOSED" },
  ];
  return (
    <div className="flex gap-4 justify-end">
      {containers.map((container) => (
        <Card key={container.label} className="">
          <div>
            <Link
              href={`/issue/list?status=${container.status}`}
              className="font-light"
            >
              {container.label}
            </Link>
            <p className="text-xl text-right font-extrabold">
              {container.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
