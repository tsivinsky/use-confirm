import { useContext, useMemo } from "react";
import { ConfirmContext } from "./context";

export type ButtonsText = {
  yes: string;
  no: string;
};

export type AskOptions = {
  yesText?: string;
  noText?: string;
};

export const useConfirm = () => {
  const {
    message,
    buttonsText,
    setMessage,
    setButtonsText,
    resolve,
    setResolve,
  } = useContext(ConfirmContext);

  const isAsking = useMemo(() => message !== null, [message]);

  const ask = async (msg: string, options: AskOptions = {}) => {
    const { yesText, noText } = options;

    return new Promise((resolve) => {
      setMessage(msg);
      setButtonsText({
        yes: yesText || buttonsText.yes,
        no: noText || buttonsText.no,
      });
      setResolve(() => (value: boolean) => resolve(value));
    });
  };

  const confirm = () => {
    resolve?.(true);
    setMessage(null);
  };
  const deny = () => {
    resolve?.(false);
    setMessage(null);
  };

  return { message, isAsking, buttonsText, ask, confirm, deny };
};
