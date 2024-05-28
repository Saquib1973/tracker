import { Text } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  if (!children) return null;
  return (
    <Text color="red" as="p" className="-mt-2">
      {children}
    </Text>
  );
};

export default ErrorMessage;
