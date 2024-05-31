import React from "react";
import {
  ConfirmContextType,
  createConfirmContextProvider,
} from "./ConfirmContext";
import { createUseConfirm } from "./useConfirm";

export function createConfirm<TOptions = {}>(options?: TOptions) {
  const ConfirmContext =
    React.createContext<ConfirmContextType<TOptions> | null>(null);

  const useConfirm = createUseConfirm<TOptions>(ConfirmContext);

  const ConfirmContextProvider = createConfirmContextProvider<TOptions>(
    ConfirmContext,
    options,
  );

  return {
    useConfirm,
    ConfirmContextProvider,
  };
}
