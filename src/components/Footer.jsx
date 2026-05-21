export function Footer({ length }) {
  return (
    <footer>
      <p>
        {length ? length : 0} {length === 1 ? "item" : "items"}
      </p>
    </footer>
  );
}
