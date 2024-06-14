import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import styles from "./styles/Home.module.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("/api/products");
      setProducts(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      setError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Product Management</h1>

      <Link href="/add">
        <a className={styles.addButton}>Add New Product</a>
      </Link>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.productList}>
        <h2>Product List</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link href={`/edit/${product.id}`}>
                    <a className={styles.editButton}>Edit</a>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
