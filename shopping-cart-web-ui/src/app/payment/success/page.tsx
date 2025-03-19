import SuccessPaymentPage from "@/components/Payment/SuccessPaymentPage";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | payment | Success",
  };
};

const page = () => {
  return (
    <>
      <SuccessPaymentPage />
    </>
  );
};

export default page;
