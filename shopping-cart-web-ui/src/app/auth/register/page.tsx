import RegisterForm from "@/components/Form/RegisterForm";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | Register",
  };
};

const page = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default page;
