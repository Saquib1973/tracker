// issue.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { patchIssueSchemaNew } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { options } from "@/app/options";

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getServerSession(options);
  if (!session) return new Response(null, { status: 401 });

  const body = await request.json();
  let { status, assignedToUserId, title, description } = body;

  const validation = patchIssueSchemaNew.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      status,
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(options);
  if (!session) return new Response(null, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({ message: "Issue deleted" });
}
