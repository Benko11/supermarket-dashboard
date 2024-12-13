export default function SearchFilter({ query, onChange }) {
  return (
    <form>
      <input
        type="text"
        className="search"
        placeholder="Filter the catalogue"
        value={query}
        onChange={onChange}
      />
    </form>
  );
}
