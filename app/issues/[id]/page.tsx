import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
import UpdateStatus from "./UpdateStatus";
import { options } from "@/app/options";

interface Params {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Params) => {
  console.log("updated");
  const session = await getServerSession(options);
  if (typeof parseInt(params.id) !== "number") notFound();
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-between w-full max-md:px-2 mb-10">
      <div className="flex flex-col md:col-span-3 gap-3 w-full">
        <IssueDetail issue={issue} />
      </div>
      {session && (
        <div className="relative">
          <div className="flex flex-col gap-3 items-center w-full sticky top-10">
            <EditButton issueId={issue?.id} />
            <UpdateStatus issueId={issue?.id} />
            <AssigneeSelect issue={issue} />
            <DeleteButton issueId={issue?.id} />
          </div>
        </div>
      )}
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssueDetailPage;

export async function generateMetadata({ params }: Params) {
  const issue = await fetchIssue(parseInt(params?.id));
  return {
    title: issue?.title,
    description: "Detail of issue" + issue?.id,
  };
}
