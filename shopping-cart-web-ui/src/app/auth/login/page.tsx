import LoginForm from "@/components/Form/LoginForm";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | Login",
  };
};

const page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
