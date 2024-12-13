import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import products from "../products.json";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SearchFilter from "../SearchFilter";
import TableHeader from "../TableHeader";
import TableFooter from "../TableFooter";
import Layout from "../Layout";
import renderStars from "../utils/renderStars";
import TableNavigation from "../TableNavigation";
import { Link } from "react-router";

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
      <table className="data">
        <TableHeader />
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>
                <label htmlFor={`checkbox-${product.id}`}>
                  <input type="checkbox" id={`checkbox-${product.id}`} />
                </label>
              </td>
              <td>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </td>
              <td style={{ minWidth: "10vw", textAlign: "center" }}>
                €{(product.price / 100).toFixed(2)}
              </td>
              <td style={{ minWidth: "100px", textAlign: "center" }}>
                {product.rating ? renderStars(product.rating) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
        <TableFooter
          filteredLength={data.length}
          totalLength={filteredProducts.length}
        />
      </table>

      <TableNavigation
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        currentPage={page}
      />
    </Layout>
  );
}
