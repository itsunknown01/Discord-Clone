"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { postMethodhelper } from "@/helpers";
import { RegisterSchema } from "@/schemas/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
      dateofbirth: "",
    },
  });

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      const date = `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
      form.setValue("dateofbirth", date);
    }
  }, [day, month, year, form]);

  const router = useRouter();

  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: z.infer<typeof RegisterSchema>) =>
      postMethodhelper("/api/auth/register", values),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    // registerUser(values);
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                  Email<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="Enter email"
                    className="bg-zinc-900 border-none placeholder:text-white"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                  Display Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="Enter name"
                    className="bg-zinc-900 border-none placeholder:text-white"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                  UserName<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="Enter username"
                    className="bg-zinc-900 border-none placeholder:text-white"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                  Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="Enter password"
                    className="bg-zinc-900 border-none placeholder:text-white"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateofbirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-[#B5BAC1] uppercase">
                  Date of Birth <span className="text-red-500">*</span>
                </FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  <Select onValueChange={setDay}>
                    <FormControl>
                      <SelectTrigger className="bg-[#1e1f22] border-none text-white">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1e1f22] border-[#2b2d31] h-60" side="top">
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem
                          key={i + 1}
                          value={(i + 1).toString()}
                          className="text-white focus:bg-[#2b2d31] focus:text-white"
                        >
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setMonth}>
                    <FormControl>
                      <SelectTrigger className="bg-[#1e1f22] border-none text-white">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1e1f22] border-[#2b2d31] h-60" side="top">
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, index) => (
                        <SelectItem
                          key={month}
                          value={(index + 1).toString()}
                          className="text-white focus:bg-[#2b2d31] focus:text-white"
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setYear}>
                    <FormControl>
                      <SelectTrigger className="bg-[#1e1f22] border-none text-white">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1e1f22] border-[#2b2d31] h-60" side="top">
                      {Array.from({ length: 100 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={(2024 - i).toString()}
                          className="text-white focus:bg-[#2b2d31] focus:text-white"
                        >
                          {2024 - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          //  disabled={isPending}
          className="w-full bg-blue-500"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
