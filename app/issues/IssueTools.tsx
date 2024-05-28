import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

const IssueTools = () => {
  return (
    <div className="flex justify-between">
      <IssueFilter />
      <Button>
        <Link href={"/issues/new"}>Create an Issue</Link>
      </Button>
    </div>
  );
};

export default IssueTools;
