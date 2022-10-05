# useConfirm

useConfirm is alternative to JavaScript `confirm` function but with one exception. It allows you to use any React component as an alert.

All you need is to wrap your React application (or a part of it) with `ConfirmContextProvider` component (or use `withConfirm` HOC), and after that, you can use `useConfirm` hook in your components.

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

package exports only one thing - `createConfirm`

### A small preview

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

### [CodeSandbox](https://codesandbox.io/s/optimistic-mestorf-lx7tw2)

1. Creating your own provider and hook

First of all, create new .ts file and import `use-confirm` package.

You need to paste this code in that new file.

```tsx
// src/lib/useConfirm.ts
import { createConfirm } from "use-confirm";

export const { ConfirmContextProvider, useConfirm } = createConfirm();
```

2. Create confirm dialog

```tsx
// src/components/ConfirmDialog.tsx
import { Modal } from "some-modal"; // really any modal, doesn't matter
import { useConfirm } from "@/lib/useConfirm";

export const ConfirmDialog = () => {
  const { isAsking, message, options, deny, confirm } = useConfirm();

  return (
    <Modal isOpen={isAsking} onClose={deny}>
      <div>{message}</div>
      <div>
        <button onClick={deny}>deny</button>
        <button onClick={confirm}>confirm</button>
      </div>
    </Modal>
  );
};
```

3. Add `ConfirmContextProvider` at the top level of your application and confirm dialog from previous step

```tsx
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ConfirmContextProvider } from "@/lib/useConfirm";

function App() {
  return (
    <ConfirmContextProvider>
      <ConfirmDialog />
      <Component />
    </ConfirmContextProvider>
  );
}

export default App;
```

4. Use `useConfirm` hook anywhere in your application

```tsx
import { useConfirm } from "@/lib/useConfirm";

const Component = () => {
  const { ask } = useConfirm();

  const handleAction = async () => {
    const ok = await ask("wanna continue?");
    if (!ok) return;

    alert("Let's go!");
  };

  return (
    <div>
      <h1>hi mom</h1>
      <button onClick={handleAction}>do the action</button>
    </div>
  );
};
```

#### Building

```bash
yarn build
```
