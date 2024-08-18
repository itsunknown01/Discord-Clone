" use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FileUpload from "../feature/file-upload";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useAddServerMutation } from "@/hooks/redux/api/dashboard/servers/serverSlice";
import { serverSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { postMethodhelper } from "@/helpers";

const CreateServerForm = () => {
  const router = useRouter();

  const { mutate: addServer, isPending } = useMutation({
    mutationKey: ["addServer"],
    mutationFn: (values: z.infer<typeof serverSchema>) =>
      postMethodhelper("/api/servers", { values }),
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
  });
  const form = useForm({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof serverSchema>) =>{
          console.log(values.imageUrl)
          addServer(values)
        })}
        className="space-y-8"
      >
        <div className="space-y-8 px-6">
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      type="image"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Server Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    placeholder="Enter Server Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button disabled={isPending} variant="default" type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateServerForm;
