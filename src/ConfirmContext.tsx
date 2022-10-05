import React, { useState } from "react";

export type ConfirmContextType<TOptions = {}> = {
  message: React.ReactNode | null;
  resolve?: (value: boolean) => void;
  options?: TOptions;
  setOptions?: React.Dispatch<React.SetStateAction<TOptions>>;
  setMessage?: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
  setResolve?: React.Dispatch<React.SetStateAction<(value: boolean) => void>>;
};

export function createConfirmContext<TOptions = {}>() {
  return React.createContext<ConfirmContextType<TOptions> | null>(null);
}

export function createConfirmContextProvider<TOptions = {}>(
  ConfirmContext: React.Context<ConfirmContextType<TOptions>>,
  options: TOptions
) {
  return ({ children }: { children?: React.ReactNode }) => (
    <ConfirmContextProvider ConfirmContext={ConfirmContext} options={options}>
      {children}
    </ConfirmContextProvider>
  );
}

export type ConfirmContextProviderProps<TOptions = {}> = {
  ConfirmContext: React.Context<ConfirmContextType<TOptions>>;
  options?: TOptions;
  children?: React.ReactNode;
};

function ConfirmContextProvider<TOptions = {}>({
  ConfirmContext,
  options: _options,
  children,
}: ConfirmContextProviderProps<TOptions>) {
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [options, setOptions] = useState<TOptions>(_options);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );

  return (
    <ConfirmContext.Provider
      value={{
        message,
        setMessage,
        options,
        setOptions,
        resolve,
        setResolve,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}
