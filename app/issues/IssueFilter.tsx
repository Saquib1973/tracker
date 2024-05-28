"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const statusOptions: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentOrderBy = searchParams.get("orderBy");
  const currentOrderDirection = searchParams.get("orderDirection");
  const currentStatus = searchParams.get("status") || "ALL";

  return (
    <Select.Root
      defaultValue={currentStatus}
      onValueChange={(status) => {
        const query = new URLSearchParams(searchParams.toString());
        query.set("status", status || "");

        if (currentOrderBy) query.set("orderBy", currentOrderBy);
        if (currentOrderDirection)
          query.set("orderDirection", currentOrderDirection);

        router.push(`?${query.toString()}`);
      }}
    >
      <Select.Trigger
        placeholder="filter by status"
        className="min-w-[100px]"
      />
      <Select.Content className="min-w-[100px]">
        {statusOptions.map((s, i) => (
          <Select.Item key={i} value={s.value ?? "ALL"}>
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
