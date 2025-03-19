import MainPage from "@/components/Payment/MainPage";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | Payment",
  };
};

const page = async () => {
  return (
    <>
      <MainPage />
    </>
  );
};

export default page;
