import { useRef } from "react";

export function AddItem({ itemValue, setItemValue, handleSubmit }) {
  const inputRef = useRef();

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add item"
        autoFocus
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>+</button>
    </form>
  );
}
