import { useParams } from "react-router";
import Layout from "../Layout";
import products from "../products.json";
import renderStars from "../utils/renderStars";
import calculateUnitPrice from "../utils/calculateUnitPrice";

export default function Product() {
  const { id } = useParams();
  const filteredProduct = products.filter((p) => p.id === +id)[0];

  const [unitPrice, unitConversion] = calculateUnitPrice(
    filteredProduct.title,
    filteredProduct.price
  );

  return (
    <Layout>
      <h1>{filteredProduct.title}</h1>
      <div>
        <img
          src={`/assets/${filteredProduct.id}.jpeg`}
          alt={filteredProduct.title}
          style={{ width: "300px", float: "right" }}
        />
        <div>
          Rating:{" "}
          {filteredProduct.rating > 0
            ? renderStars(filteredProduct.rating)
            : "-"}
        </div>
        <div>Price: €{(filteredProduct.price / 100).toFixed(2)}</div>
        <div>
          Unit price: €{(unitPrice / 100).toFixed(2)}/{unitConversion}
        </div>
        {filteredProduct.ingredients?.length > 0 && (
          <div>
            Ingredients: <br />
            {filteredProduct.ingredients.join(", ")}
          </div>
        )}
      </div>
      <button className="action">Edit product</button>
    </Layout>
  );
}
