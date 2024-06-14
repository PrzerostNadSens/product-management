import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/products", { name, description, price, stock });
      router.push("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
