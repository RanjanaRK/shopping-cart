"use client";

import { logoutAction } from "@/hooks/action";
import userLogout from "@/hooks/auth/userLogout";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const logoutHandle = async () => {
    const { success, message } = await userLogout();

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);

      await logoutAction();
    }
  };

  return (
    <>
      <Button
        onClick={logoutHandle}
        size={"sm"}
        variant={"ghost"}
        className="hover:text-red-600"
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
