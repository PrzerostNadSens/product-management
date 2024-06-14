import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://backend:3000/api/products?id=${id}`)
        .then((response) => {
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setStock(product.stock);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://backend:3000/api/products?id=${id}`, {
        name,
        description,
        price,
        stock,
      });
      router.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
