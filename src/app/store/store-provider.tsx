"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { type StoreType, createStore } from "@/app/store/store";
import { userActions } from "@/entities/user";

interface StoreProviderProps {
  userName?: string;
  children?: React.ReactNode;
}

export const StoreProvider = ({ userName, children }: StoreProviderProps) => {
  const storeRef = useRef<StoreType | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
    if (userName) storeRef.current.dispatch(userActions.setUserName(userName));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
