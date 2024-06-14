import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import styles from "../styles/AddEditProduct.module.css";
import { useRouter } from "next/router";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function EditProduct() {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProductDetails(id as string);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await axios.get<Product>(
        `/api/products?id=${productId}`
      );
      setProduct(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching product details");
      console.error("Error fetching product details:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`/api/products?id=${product.id}`, product);
      router.push(`/products/${product.id}`);
    } catch (error) {
      setError("Error updating product");
      console.error("Error updating product:", error);
    }
  };

  if (!product.id) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>Edit Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.addEditProductForm}>
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
            <Link href={`/products/${product.id}`}>
              <a className={styles.cancelButton}>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
