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

### Example

#### App.tsx

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

From now on, you can use `useConfirm` hook in your components.

But, actually, you need one more thing - a modal component to act as confirm window.

You can use any component you want here. In this example, I use my own library called [modal.jsx](https://npmjs.com/package/modal.jsx).
But you can use whatever you like.

#### The same App.tsx file

```tsx
import { useConfirm, ConfirmContextProvider } from "use-confirm";
import { Modal } from "modal.jsx";

const YourApp = ({ children }) => {
  const { message, isAsking, buttonsText, confirm, deny } = useConfirm();

  return (
    <div>
      <Modal isOpen={isAsking} onClickOutside={deny}>
        <h2>{message}</h2>
        <div>
          <button onClick={deny}>{buttonsText.no}</button>
          <button onClick={confirm}>{buttonsText.yes}</button>
        </div>
      </Modal>
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

Now, you are ready for some action!

#### Component.tsx

```tsx
import { useConfirm } from "use-confirm";

export const Component = () => {
  const { ask } = useConfirm();

  // NOTE: make sure, this function is async
  const handleDangerousThing = async () => {
    const ok = await ask("are sure?");

    // ask function also takes optional second argument for options
    // Example:
    // ask("are sure?", { yesText: "Absolutely", noText: "nope" })

    if (ok) {
      console.log("ok, fine");
    }
  };

  return (
    <div>
      <button onClick={handleDangerousThing}>do a dangerous thing</button>
    </div>
  );
};
```

#### Building

```bash
yarn build
```
