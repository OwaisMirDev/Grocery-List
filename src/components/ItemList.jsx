import { LineItem } from "./LineItem";

export function ItemList({ items, checkboxHandler, deleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          checkboxHandler={checkboxHandler}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
}
