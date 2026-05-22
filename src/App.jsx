import { useEffect, useState } from "react";
import "./App.css";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AddItem } from "./components/AddItem";
import { SearchItem } from "./components/SearchItem";

function App() {
  const BASE_URL = "http://localhost:3000";

  const [items, setItems] = useState([]);
  const [itemValue, setItemValue] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch(`${BASE_URL}/items`);
        if (!response.ok) throw Error("Failed to get items");
        const data = await response.json();
        setItems(data);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    }
    // setTimeout(() => {
    //   getItems();
    // }, 2000);
    getItems();
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function deleteItem(id) {
    const arr = items.filter((item) => item.id !== id);
    setItems(arr);
  }
  function checkboxHandler(id) {
    const arr = items.map((item) =>
      item.id == id ? { ...item, isAvailable: !item.isAvailable } : item,
    );
    setItems(arr);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!itemValue.trim()) return;

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
      <main>
        {loading && <p>Loading items.....</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !loading && (
          <Content
            items={items?.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )}
            setItems={setItems}
            deleteItem={deleteItem}
            checkboxHandler={checkboxHandler}
          />
        )}
      </main>

      <Footer length={items?.length} />
    </div>
  );
}

export default App;
