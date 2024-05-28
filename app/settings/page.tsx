import { Heading } from "@radix-ui/themes";
import Form from "./Form";

const Page = () => {
  return (
    <div>
      <Heading className="mb-10">Settings</Heading>
      <div className="border p-6 px-2 rounded-xl">
        <Form />
      </div>
    </div>
  );
};

export default Page;
