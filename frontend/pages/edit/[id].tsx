import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching product");
      console.error("Error fetching product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, product);
      router.push("/");
    } catch (error) {
      setError("Error updating product");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.addProductForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formButtons}>
            <button type="submit">Update Product</button>
            <Link href="/">
              <a className={styles.cancelButton}>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
