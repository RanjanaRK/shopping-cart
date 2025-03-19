"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} theme={theme} />
    </>
  );
};

export default ToastProvider;
