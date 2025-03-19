"use client";

import postProduct from "@/hooks/postProduct";
import { AddProductSchemaType } from "@/lib/types";
import { addProductSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
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

const PostProductForm = () => {
  const [selectedImage, setSelectedImage] = useState(false);

  const rhForm = useForm<AddProductSchemaType>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },

    resolver: zodResolver(addProductSchema),
    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => {
      setSelectedImage(true);
    },
    onClear: () => {
      setSelectedImage(false);
    },
  });

  const clearImg = () => {
    clear();
    rhForm.reset();
  };

  const addProductsFunc = async (fdata: AddProductSchemaType) => {
    const { success, message } = await postProduct(fdata, plainFiles);

    if (!success) {
      toast.error(message);
    }
    if (success) {
      clearImg();
      toast.success(message);
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center">
        <Card className="w-[320px] border">
          <CardHeader>
            <CardTitle className="text-center font-bold">
              Add Products
            </CardTitle>
          </CardHeader>
          <Form {...rhForm}>
            <CardContent className="space-y-4">
              {!selectedImage && (
                <Button className="w-full" onClick={() => openFilePicker()}>
                  Select file
                </Button>
              )}
              {selectedImage &&
                filesContent.map((file, i) => (
                  <div className="relative" key={i}>
                    <img
                      src={file.content}
                      alt={file.name}
                      width={290}
                      className="object-contain"
                    />
                    <button
                      onClick={clearImg}
                      className="absolute right-1 top-1 bg-white/30"
                    >
                      <X />
                    </button>
                  </div>
                ))}

              <form
                onSubmit={rhForm.handleSubmit(addProductsFunc)}
                className="space-y-4"
              >
                <FormField
                  control={rhForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Products name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rhForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rhForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Product Price"
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
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
                    "Add"
                  )}
                </Button>
              </form>
            </CardContent>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default PostProductForm;
