import { Button, Heading, Skeleton, TextField } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <form className="gap-4 flex flex-col ">
        <Skeleton>
          <Heading>Create a new Issue</Heading>
        </Skeleton>
        <Skeleton>
          <TextField.Root className="text-4xl" placeholder="Enter issue title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            doloremque ad sunt delectus eaque veniam corrupti qui perspiciatis
            id hic!
          </TextField.Root>
        </Skeleton>
        <Skeleton height={"200px"} width={"300px"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          deserunt adipisci rem animi hic sapiente enim dicta officiis odio,
          reprehenderit ab quae ipsum recusandae? Consequuntur et doloribus
          laborum harum delectus incidunt itaque in aspernatur sed. Hic rerum
          quas enim praesentium magni libero, exercitationem molestiae
          distinctio iste expedita ab laboriosam dolor! Distinctio saepe sit ea
          fugit perferendis? Laborum odio nobis ipsam commodi officiis quisquam
          aperiam omnis. Animi ex saepe id, minus enim vero neque eius rerum,
          repudiandae tenetur sequi pariatur tempora, atque molestias odit
          cupiditate nobis consequatur repellendus? Dicta inventore aut, eos,
          laborum ipsum explicabo qui error eveniet debitis incidunt voluptatum.
        </Skeleton>
        <Skeleton>
          <div className="flex justify-between">
            <Button>Submit</Button>
          </div>
        </Skeleton>
      </form>
    </div>
  );
};

export default IssueFormSkeleton;
