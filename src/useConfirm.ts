import { useContext, useMemo, Context } from "react";
import { ConfirmContextType } from "./ConfirmContext";

export function createUseConfirm<TOptions = {}>(
  context: Context<ConfirmContextType<TOptions>>
) {
  return () => useConfirm<TOptions>(context);
}

function useConfirm<TOptions = {}>(
  ConfirmContext: Context<ConfirmContextType<TOptions>>
) {
  const { message, setMessage, options, setOptions, resolve, setResolve } =
    useContext(ConfirmContext);

  const isAsking = useMemo(() => message !== null, [message]);

  const ask = async (
    msg: React.ReactNode,
    _options: typeof options
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setMessage(msg);
      setOptions(_options);
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

  return { message, isAsking, options, ask, confirm, deny };
}
