"use client";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <Short rotate={true} />
      </Button>
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <Long rotate={true} />
      </Button>
      <p className="text-sm">
        Page {currentPage}/{pageCount}
      </p>
      <Button
        color="gray"
        disabled={pageCount === currentPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <Long rotate={false} />
      </Button>
      <Button
        color="gray"
        disabled={pageCount === currentPage}
        onClick={() => changePage(pageCount)}
      >
        <Short rotate={false} />
      </Button>
    </div>
  );
};

export default Pagination;

const Short = ({ rotate }: { rotate: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`transform ${rotate ? "rotate-180" : ""} size-4`}
    >
      <path
        fillRule="evenodd"
        d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Long = ({ rotate }: { rotate: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-4 transform ${rotate ? "rotate-180" : ""} `}
  >
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);
