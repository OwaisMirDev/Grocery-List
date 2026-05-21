export function LineItem({ item, checkboxHandler, deleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        name=""
        id=""
        checked={item.isAvailable}
        onChange={() => checkboxHandler(item.id)}
      />
      <label
        style={{
          textDecoration: !item.isAvailable ? "line-through" : "",
        }}
      >
        {item.name}
      </label>
      <button
        onClick={() => {
          deleteItem(item.id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
