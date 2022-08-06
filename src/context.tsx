import React, { useState } from "react";
import { ButtonsText } from "./useConfirm";

export type ConfirmContextType = {
  message: string | null;
  buttonsText: ButtonsText;
  resolve?: (value: boolean) => void;
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>;
  setButtonsText?: React.Dispatch<React.SetStateAction<ButtonsText>>;
  setResolve?: React.Dispatch<React.SetStateAction<(value: boolean) => void>>;
};

export const ConfirmContext = React.createContext<ConfirmContextType | null>(
  null
);

const initialButtonsText: ButtonsText = {
  yes: "Yes",
  no: "No",
};

export type ConfirmContextProviderProps = {
  buttonsText?: ButtonsText;
  children?: React.ReactNode;
};

export const ConfirmContextProvider: React.FC<ConfirmContextProviderProps> = ({
  buttonsText: defaultButtonsText = initialButtonsText,
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [buttonsText, setButtonsText] =
    useState<ButtonsText>(defaultButtonsText);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );

  return (
    <ConfirmContext.Provider
      value={{
        message,
        buttonsText,
        setMessage,
        setButtonsText,
        resolve,
        setResolve,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};

export type WithConfirmOptions = {
  buttonsText?: ButtonsText;
};

export const withConfirm = (
  Component: React.ComponentType,
  options?: WithConfirmOptions
) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <ConfirmContextProvider buttonsText={options.buttonsText}>
          <Component {...this.props} />
        </ConfirmContextProvider>
      );
    }
  };
};
