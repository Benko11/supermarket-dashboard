import { useEffect, useState } from "react";
import products from "../products.json";
import SearchFilter from "../SearchFilter";
import Layout from "../Layout";
import renderStars from "../utils/renderStars";
import { Link } from "react-router";
import DataTable from "../components/DataTable";

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setPage(0);
  }, [query]);

  const filteredProducts = products.filter((p) =>
    query === "" ? p : p.title.toLowerCase().includes(query.toLowerCase())
  );

  const startItem = page * pageSize;
  const endItem =
    (page + 1) * pageSize >= filteredProducts.length
      ? filteredProducts.length
      : (page + 1) * pageSize;
  const data = filteredProducts.slice(startItem, endItem);
  const maxPages = Math.floor(filteredProducts.length / pageSize);

  function handlePrevPage() {
    if (page < 0) setPage(maxPages);
    else setPage((prev) => prev - 1);
  }

  function handleNextPage() {
    if (page >= maxPages) setPage(0);
    else setPage((prev) => prev + 1);
  }

  function handleSearchQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <Layout>
      <SearchFilter query={query} onChange={handleSearchQuery} />

      <DataTable
        headers={["Title", "Price", "Rating"]}
        data={data}
        selectable={false}
        totalSize={filteredProducts.length}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        page={page}
        pageSize={pageSize}
        handlers={[
          {
            title: (id, ...attr) => (
              <Link to={`/product/${id}`}>{attr[0]}</Link>
            ),
          },
          {
            price: (id, ...attr) => `€${(attr[0] / 100).toFixed(2)}`,
          },
          {
            rating: (id, ...attr) => (attr[0] ? renderStars(attr[0]) : "-"),
          },
        ]}
        classHandlers={{ 1: ["price", "centre"], 2: ["rating", "centre"] }}
      />
    </Layout>
  );
}
