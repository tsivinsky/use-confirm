# useConfirm

## Install

##### yarn

```bash
yarn add use-confirm
```

##### npm

```bash
npm i use-confirm
```

## Usage

`use-confirm` exports several things:

- `useConfirm` - React hook;
- `ConfirmContextProvider` - React context provider;
- `withConfirm` - HOC for using instead of `ConfirmContextProvider`;

### A small preview

[![Edit use-confirm-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-confirm-example-rvs5zs?fontsize=14&hidenavigation=1&theme=dark)

```tsx
const Component = () => {
  const { ask } = useConfirm();

  const handle = async () => {
    const ok = await ask("42?");
    console.log(ok); // true || false
  };

  return (
    <div>
      <button onClick={handle}>click it</button>
    </div>
  );
};
```

### Example

Code for that example you can find on [codesandbox](https://codesandbox.io/s/use-confirm-example-rvs5zs)

#### App.tsx

First of all, you need to wrap your application (or a part of it) inside `ConfirmContextProvider`.

```tsx
import { ConfirmContextProvider } from "use-confirm";

export default function App() {
  return (
    <ConfirmContextProvider>
      <YourApp />
    </ConfirmContextProvider>
  );
}
```

After that, you need to create a confirm modal component. Or don't and just throw it somewhere in application.

You can use whatever component you want. I use here my own [modal.jsx](https://npmjs.com/package/modal.jsx) component.

#### Dialog.tsx

```tsx
import { Modal } from "modal.jsx";
import { useConfirm } from "use-confirm";

export const Dialog = () => {
  const { message, isAsking, buttonsText, confirm, deny } = useConfirm();

  return (
    <Modal isOpen={isAsking} onClickOutside={deny}>
      <h2>{message}</h2>
      <div>
        <button onClick={deny}>{buttonsText.no}</button>
        <button onClick={confirm}>{buttonsText.yes}</button>
      </div>
    </Modal>
  );
};
```

After that, you are ready to use `useConfirm` hook.

#### Update App.tsx

```tsx
import { useState } from "react";
import { useConfirm, ConfirmContextProvider } from "use-confirm";
import { Dialog } from "./Dialog";

const YourApp = () => {
  const { ask } = useConfirm();
  const [isAgreed, setIsAgreed] = useState(false);

  // NOTE: make sure this function is async
  const handleDangerousAction = async () => {
    const ok = await ask("are sure about that?");

    // ask function also takes optional second argument for options
    // Example:
    // ask("are sure?", { yesText: "Absolutely", noText: "nope" })

    if (ok) {
      setIsAgreed(true);
    } else {
      setIsAgreed(false);
    }
  };

  return (
    <div>
      <button onClick={handleDangerousAction}>do a dangerous action</button>
      <p>You {isAgreed ? "agreed" : "didn't agreed"}</p>

      <Dialog />
    </div>
  );
};

export default function App() {
  return (
    <ConfirmContextProvider>
      <YourApp />
    </ConfirmContextProvider>
  );
}
```

### use withConfirm HOC

Alternatively, you can use `withConfirm` HOC instead of wrapping your App with `ConfirmContextProvider` component.

#### App.tsx

```tsx
import { withConfirm } from "use-confirm";

const App = () => {
  // you can easily use `useConfirm` functionaly here

  return (
    <div>
      <h2>hello useConfirm</h2>
    </div>
  );
};

// all because of that line
export default withConfirm(App);
```

#### Building

```bash
yarn build
```
