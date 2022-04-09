import { useMemo } from "react";
import { useConfirmContext } from "./context";

export type AskOptions<T> = Partial<T> & {
  yesText?: string;
  noText?: string;
};

export const useConfirm = <T = {}>() => {
  const {
    message,
    buttonsText,
    setMessage,
    setButtonsText,
    resolve,
    setResolve,
    options,
    setOptions,
  } = useConfirmContext();

  const isAsking = useMemo(() => message !== null, [message]);

  const ask = async (
    msg: string,
    options?: AskOptions<T>
  ): Promise<boolean> => {
    const { yesText, noText, ...otherOptions } = options || {};

    return new Promise((resolve) => {
      setMessage(msg);
      setButtonsText({
        yes: yesText || buttonsText.yes,
        no: noText || buttonsText.no,
      });
      setOptions(otherOptions);
      setResolve(() => (value: boolean) => resolve(value));
    });
  };

  const confirm = () => {
    resolve?.(true);
    setMessage(null);
    setOptions({});
  };
  const deny = () => {
    resolve?.(false);
    setMessage(null);
    setOptions({});
  };

  return { message, isAsking, buttonsText, options, ask, confirm, deny };
};
