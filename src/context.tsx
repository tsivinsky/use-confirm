import React, { useContext, useState } from "react";

export type ButtonsText = {
  yes: string;
  no: string;
};

export type ConfirmContextType = {
  message: string | null;
  buttonsText: ButtonsText;
  resolve?: (value: boolean) => void;
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>;
  setButtonsText?: React.Dispatch<React.SetStateAction<ButtonsText>>;
  setResolve?: React.Dispatch<React.SetStateAction<(value: boolean) => void>>;
  options?: {};
  setOptions?: React.Dispatch<React.SetStateAction<{}>>;
};

export const ConfirmContext = React.createContext<ConfirmContextType | null>(
  null
);

export const useConfirmContext = () =>
  useContext<ConfirmContextType>(ConfirmContext);

const initialButtonsText: ButtonsText = {
  yes: "Yes",
  no: "No",
};

export type ConfirmContextProviderProps<T = {}> = {
  buttonsText?: ButtonsText;
  options?: T;
};

export const ConfirmContextProvider: React.FC<
  React.PropsWithChildren<ConfirmContextProviderProps>
> = ({
  buttonsText: defaultButtonsText = initialButtonsText,
  options: defaultOptions,
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [buttonsText, setButtonsText] =
    useState<ButtonsText>(defaultButtonsText);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );
  const [options, setOptions] = useState(defaultOptions);

  return (
    <ConfirmContext.Provider
      value={{
        message,
        buttonsText,
        setMessage,
        setButtonsText,
        resolve,
        setResolve,
        options,
        setOptions,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};

export type WithConfirmOptions<T = {}> = T & {
  buttonsText?: ButtonsText;
};

export const withConfirm = (
  Component: React.ComponentType,
  { buttonsText, ...options }: WithConfirmOptions
) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <ConfirmContextProvider buttonsText={buttonsText} options={options}>
          <Component {...this.props} />
        </ConfirmContextProvider>
      );
    }
  };
};
