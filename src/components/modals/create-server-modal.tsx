"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { useModalStore } from "@/hooks/use-modal-store";
import { serverSchema } from "@/schemas/discord";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import FileUpload from "../feature/file-upload";

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isPending = false;

  const form = useForm<z.infer<typeof serverSchema>>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const addServer = (values: z.infer<typeof serverSchema>) => {};

  return (
    <Modal
      isModalOpen={isOpen && type === "createServer"}
      handleClose={() => onClose()}
      title="Customize your server"
      description="Give your server a personality with a name and an image. You can
            always change it later."
      className="bg-zinc-900 !text-white border-none"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values: z.infer<typeof serverSchema>) => {
              addServer(values);
              onClose();
            }
          )}
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
          <DialogFooter className="bg-zinc-800 px-6 py-4">
            <Button
              disabled={isPending}
              variant="default"
              type="submit"
              className="bg-[#5d4dcc]"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateServerModal;