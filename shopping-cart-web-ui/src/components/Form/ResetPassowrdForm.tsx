"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import resetPassword from "@/hooks/auth/resetPassword";
import { ResetPasswordSchemaType } from "@/lib/types";
import { resetPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassowrdForm = () => {
  //   const { push } = useRouter();

  const rhForm = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  // const resetPasswordHandle = async (fdata: ResetPasswordSchemaType) => {
  //   const request = await fetch(
  //     process.env.API_URL + "/auth/password/request",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ fdata }),
  //       cache: "no-cache",
  //     },
  //   );
  // };

  const resetPasswordHandle = async (fdata: ResetPasswordSchemaType) => {
    const { success, message } = await resetPassword(fdata);

    if (!success) {
      toast.error(message);
      console.log(message);
    }
    if (success) {
      toast.success(message);
      console.log(message);
    }
  };

  return (
    <>
      <Form {...rhForm}>
        <form
          onSubmit={rhForm.handleSubmit(resetPasswordHandle)}
          className="grid h-screen place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader>
              <CardTitle className="text-center font-bold">
                Reset Passowrd
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={rhForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                type="submit"
                disabled={
                  !rhForm.formState.isValid || rhForm.formState.isSubmitting
                }
              >
                {rhForm.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default ResetPassowrdForm;
