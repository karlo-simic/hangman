"use server";

import { cookies } from "next/headers";
import { ZodError } from "zod";

import { loginSchema } from "../model/loginValidation";

export const login = async (
  prevState: ActionState,
  data: FormData
): Promise<ActionState> => {
  try {
    const { userName } = loginSchema.parse({ userName: data.get("userName") });

    const cookieStore = cookies();
    cookieStore.set("userName", userName);

    return {
      status: "success",
      message: "Name saved successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
};
