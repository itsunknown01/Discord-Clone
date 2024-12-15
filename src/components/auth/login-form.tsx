"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { postMethodhelper } from "@/helpers";
// import { useModalStore } from "@/hooks/store/use-modal-store";
// import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/schemas/auth";
// import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const router = useRouter();
  // const { onOpen } = useModalStore();

  // const { mutate: LoginUser, isPending } = useMutation({
  //   mutationKey: ["loginUser"],
  //   mutationFn: (values: z.infer<typeof LoginSchema>) =>
  //     postMethodhelper("/api/auth/login", values),
  //   onSuccess: () => {
  //     router.push(DEFAULT_LOGIN_REDIRECT);
  //     window.location.href = DEFAULT_LOGIN_REDIRECT;
  //   },
  // });

  // const { mutate: Reset } = useMutation({
  //   mutationKey: ["reset-password"],
  //   mutationFn: (email: string) =>
  //     postMethodhelper("/api/auth/password", { email }),
  // });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const LoginSubmit = (values: z.infer<typeof LoginSchema>) => {
    // LoginUser(values);
    form.reset();
  };

  const handleForgotPasswordClick = () => {
    const email = form.getValues("email");
    if (email === "") {
      form.setError("email", {
        type: "required",
        message: "Email is required",
      });
    } else {
      // Reset(email)
      // onOpen("openMessage", { email });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(LoginSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    // disabled={isPending}
                    className="bg-zinc-900 border-none text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    // disabled={isPending}
                    className="bg-zinc-900 border-none text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <Button
                  variant="link"
                  className="px-0 text-white"
                  type="button"
                  onClick={handleForgotPasswordClick}
                >
                  Forgot your Password?
                </Button>
              </FormItem>
            )}
          />
        </div>
        <Button 
        // disabled={isPending} 
        type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;