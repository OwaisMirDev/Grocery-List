import { useState } from "react";
import "./App.css";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AddItem } from "./components/AddItem";
import { SearchItem } from "./components/SearchItem";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")));
  const [itemValue, setItemValue] = useState("");
  const [search, setSearch] = useState("");

  function deleteItem(id) {
    const arr = items.filter((item) => item.id !== id);
    setItems(arr);
    localStorage.setItem("items", JSON.stringify(arr));
  }
  function checkboxHandler(id) {
    const arr = items.map((item) =>
      item.id == id ? { ...item, isAvailable: !item.isAvailable } : item,
    );
    setItems(arr);
    localStorage.setItem("items", JSON.stringify(arr));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!itemValue.trim()) return;
    if (!items) {
      const newItems = [
        {
          id: 1,
          name: itemValue,
          isAvailable: false,
        },
      ];
      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
      setItemValue("");
      return;
    }

    const updatedItems = [
      ...items,
      {
        id: items.length === 0 ? 1 : items[items.length - 1].id + 1,
        name: itemValue,
        isAvailable: false,
      },
    ];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItemValue("");
  }

  return (
    <div className="app">
      <Header title={"Grocery List"} />
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem
        itemValue={itemValue}
        setItemValue={setItemValue}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )}
        setItems={setItems}
        deleteItem={deleteItem}
        checkboxHandler={checkboxHandler}
      />
      <Footer length={items?.length} />
    </div>
  );
}

export default App;
