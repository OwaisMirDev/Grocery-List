import { ItemList } from "./ItemList";

export function Content({ items, deleteItem, checkboxHandler }) {
  return items?.length ? (
    <ItemList
      items={items}
      deleteItem={deleteItem}
      checkboxHandler={checkboxHandler}
    />
  ) : (
    <p className="empty-items" style={{}}>
      No items available!!
    </p>
  );
}
