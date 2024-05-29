declare global {
  export type ActionStatus = "error" | "success";

  export type ActionState = {
    status: ActionStatus;
    message: string;
    errors?: {
      path: string;
      message: string;
    }[];
  } | null;

  declare type RootState = import("../src/app/store/store").RootState;
  declare type AppDispatch = import("../src/app/store/store").AppDispatch;
}

export {};
