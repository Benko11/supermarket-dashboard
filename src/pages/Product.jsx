import { useParams } from "react-router";
import Layout from "../Layout";
import products from "../products.json";
import renderStars from "../utils/renderStars";
import calculateUnitPrice from "../utils/calculateUnitPrice";
import { useState } from "react";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";

export default function Product() {
  const { id } = useParams();
  const filteredProduct = products.filter((p) => p.id === +id)[0];

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    id: filteredProduct.id,
    title: filteredProduct.title,
    rating: filteredProduct.rating,
    price: filteredProduct.price,
    ingredients:
      filteredProduct?.ingredients?.length > 0
        ? filteredProduct.ingredients
        : [],
    allergens:
      filteredProduct?.allergens?.length > 0 ? filteredProduct.allergens : [],
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [unitPrice, unitConversion] = calculateUnitPrice(
    data.title,
    data.price
  );

  function handleToggleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleUpdateData(e) {
    const newData = {
      ...data,
      [e.target.name]: isNaN(+e.target.value)
        ? e.target.value
        : +e.target.value,
    };
    setData(newData);
  }

  function handleUpdatePriceEuros(e) {
    const newPrice = +e.target.value * 100 + (data.price % 100);
    const newData = { ...data, price: newPrice };
    setData(newData);
  }

  function handleUpdatePriceCents(e) {
    const currentCents = data.price % 100;
    const regularNewPrice =
      Math.floor(data.price / 100) * 100 + (e.target.value % 100);

    let newPrice;
    if (currentCents === 99 && regularNewPrice % 100 === 0) {
      newPrice = Math.floor(data.price + 1);
    } else if (currentCents === 0 && regularNewPrice % 100 === 99)
      newPrice = Math.floor(data.price - 1);
    else newPrice = regularNewPrice;

    const newData = { ...data, price: newPrice };
    setData(newData);
  }

  function handleAddIngredient(e) {
    e.preventDefault();
    const newIngredients = [...data.ingredients, newIngredient];
    const newData = { ...data, ingredients: newIngredients };
    setData(newData);
    setNewIngredient("");
  }

  function handleIngredientChange(e) {
    let newSelectedIngredients;
    if (selectedIngredients.includes(+e.target.value)) {
      newSelectedIngredients = selectedIngredients.filter(
        (index) => index !== +e.target.value
      );
    } else {
      newSelectedIngredients = [...selectedIngredients, +e.target.value];
    }
    setSelectedIngredients(newSelectedIngredients);
  }

  function handleDeleteIngredients() {
    const newIngredients = data.ingredients.filter(
      (ingredient) =>
        !selectedIngredients.includes(data.ingredients.indexOf(ingredient))
    );
    const newData = { ...data, ingredients: newIngredients };
    setData(newData);
    setSelectedIngredients([]);
  }

  if (isEditing)
    return (
      <Layout>
        <h1>{data.title}</h1>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={data.title}
              onChange={handleUpdateData}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>

            <div className="price">
              <div>
                €
                <input
                  type="number"
                  name=""
                  id=""
                  value={Math.floor(data.price / 100)}
                  onChange={handleUpdatePriceEuros}
                  min={0}
                />
              </div>
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  value={data.price % 100}
                  onChange={handleUpdatePriceCents}
                  min={-1}
                  max={101}
                />
                cents
              </div>
              <div className="ml-auto">€{(data.price / 100).toFixed(2)}</div>
            </div>
          </div>
          <div>
            <label htmlFor="rating" className="rating">
              Rating
            </label>
            <RadioGroup
              name="rating"
              values={[1, 2, 3, 4, 5]}
              labels={[1, 2, 3, 4, 5].map((star) => renderStars(star))}
              onChange={handleUpdateData}
              currentValue={data.rating}
            />
          </div>
          <div>
            <label htmlFor="ingredients" className="ingredients">
              Ingredients
            </label>
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  name=""
                  id=""
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add new ingredient here"
                />
                <button
                  className="secondary-action"
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
              </div>
              <CheckboxGroup
                labels={data.ingredients}
                onChange={handleIngredientChange}
                currentValues={selectedIngredients}
                name="ingredients"
              />
              {data?.ingredients.length > 0 && (
                <button
                  className="secondary-action"
                  disabled={selectedIngredients.length < 1}
                  onClick={handleDeleteIngredients}
                >
                  Delete selected ingredients
                </button>
              )}
            </div>
          </div>

          <button className="action" onClick={handleToggleEdit}>
            Save product
          </button>
        </form>
      </Layout>
    );

  return (
    <Layout>
      <h1>{data.title}</h1>
      <div>
        <img
          src={`/assets/${data.id}.jpeg`}
          alt={data.title}
          style={{ width: "300px", float: "right" }}
        />
        <div>Rating: {data.rating > 0 ? renderStars(data.rating) : "-"}</div>
        <div>Price: €{(data.price / 100).toFixed(2)}</div>
        <div>
          Unit price: €{(unitPrice / 100).toFixed(2)}/{unitConversion}
        </div>
        {data.ingredients?.length > 0 && (
          <div>
            Ingredients: <br />
            {data.ingredients.join(", ")}
          </div>
        )}
      </div>

      <button className="action" onClick={handleToggleEdit}>
        Edit product
      </button>
    </Layout>
  );
}
