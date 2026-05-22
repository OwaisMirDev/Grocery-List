import { useEffect, useState } from "react";
import "./App.css";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AddItem } from "./components/AddItem";
import { SearchItem } from "./components/SearchItem";
import { apiRequest } from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState([]);
  const [itemValue, setItemValue] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch(API_URL);
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

  async function deleteItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  async function checkboxHandler(id) {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item,
    );
    setItems(updatedItems);
    const myItem = updatedItems.find((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAvailable: myItem.isAvailable }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!itemValue.trim()) return;
    const newItem = {
      id: items.length === 0 ? 1 : items[items.length - 1].id + 1,
      name: itemValue,
      isAvailable: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setItemValue("");
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
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
