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
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [addingProduct, setAddingProduct] = useState(false);

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
      await axios.delete(`/api/products?id=${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      setError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post<Product>("/api/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
      });
      setAddingProduct(false);
    } catch (error) {
      setError("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <Link href="/add">
        <a className={styles.addButton}>Add New Product</a>
      </Link>
      {addingProduct ? (
        <div className={styles.addProductForm}>
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
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
            <div>
              <button type="submit">Add Product</button>
              <button type="button" onClick={() => setAddingProduct(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.productList}>
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
