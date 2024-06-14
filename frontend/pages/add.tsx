import Link from "next/link";
import axios from "axios";
import styles from "./styles/AddEditProduct.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/api/products", newProduct);
      router.push("/");
    } catch (error) {
      setError("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.addProductForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <Link href="/">
              <a className={styles.cancelButton}>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
