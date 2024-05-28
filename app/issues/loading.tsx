import { Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@radix-ui/themes";
import IssueTools from "./IssueTools";
const loading = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueTools />
      <Table.Root variant="surface" className="mt-4">
        <Table.Header className="bg-gray-200">
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue, id) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Skeleton />
                <div className="md:hidden text-xs">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loading;
