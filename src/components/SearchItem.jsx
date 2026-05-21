export function SearchItem({ search, setSearch }) {
  return (
    <input
      type="text"
      className="searchInput"
      placeholder="Search Item"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
