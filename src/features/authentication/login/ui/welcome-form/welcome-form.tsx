"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  useToast,
} from "@/shared/ui";
import { useAppDispatch } from "@/shared/lib";
import { userActions } from "@/entities/user";
import { login, loginSchema } from "@/entities/session";

const SubmitButton = ({
  state,
  isValid,
}: {
  state: ActionState;
  isValid: boolean;
}) => {
  const { pending } = useFormStatus();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (pending) {
      setIsLoading(true);
      return;
    }
    if (state?.status === "error") {
      setIsLoading(false);
    }
  }, [pending, state]);

  return (
    <Button type="submit" disabled={!isValid} className="w-full">
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Please wait" : "Submit"}
    </Button>
  );
};

export const WelcomeForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const [state, formAction] = useFormState<ActionState, FormData>(login, null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
    },
  });

  useEffect(() => {
    if (!state) return;

    if (state.status === "success") {
      dispatch(userActions.setUserName(form.getValues().userName));
      router.push("/game");
      return;
    }

    if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: state.message,
      });
    }
  }, [state, toast, dispatch, form, router]);

  return (
    <Form {...form}>
      <form className="space-y-8" action={formAction}>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton state={state} isValid={form.formState.isValid} />
      </form>
    </Form>
  );
};
