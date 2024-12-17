"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { putMethodhelper } from "@/helpers";
import { PasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const PasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const { mutate: PasswordChange, isPending } = useMutation({
    mutationKey: ["password-change"],
    mutationFn: ({
      newToken,
      values,
    }: {
      newToken: string;
      values: z.infer<typeof PasswordSchema>;
    }) => putMethodhelper("/api/auth/password", { token: newToken, values }),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const PasswordSubmit = (values: z.infer<typeof PasswordSchema>) => {
    PasswordChange({ newToken: token, values });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(PasswordSubmit)} className="space-y-4">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                New Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  // disabled={isPending}
                  className="bg-zinc-900 border-none "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          //  disabled={isPending}
          type="submit"
          className="w-full bg-blue-600"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
