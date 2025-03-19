"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const AddProdcutButton = () => {
  const { push } = useRouter();
  return (
    <>
      <Button
        onClick={() => push("/addProducts")}
        size={"sm"}
        variant={"ghost"}
      >
        Add Products
      </Button>
    </>
  );
};

export default AddProdcutButton;
