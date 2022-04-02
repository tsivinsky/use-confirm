import { useState } from "react";

export type ButtonsText = {
  yes: string;
  no: string;
};

export type AskOptions = {
  yesText?: string;
  noText?: string;
};

export const useConfirm = () => {
  const [isAsking, setIsAsking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [buttonsText, setButtonsText] = useState<ButtonsText>({
    yes: "Yes",
    no: "No",
  });
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );

  const ask = async (msg: string, options: AskOptions = {}) => {
    const { yesText, noText } = options;

    return new Promise((resolve) => {
      setMessage(msg);
      setIsAsking(true);
      setButtonsText((prev) => ({
        yes: yesText || prev.yes,
        no: noText || prev.no,
      }));
      setResolve(() => (value: boolean) => resolve(value));
    });
  };

  const confirm = () => {
    resolve?.(true);
    setIsAsking(false);
  };
  const deny = () => {
    resolve?.(false);
    setIsAsking(false);
  };

  return { message, isAsking, buttonsText, ask, confirm, deny };
};
