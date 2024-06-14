import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import styles from "../styles/ProductDetails.module.css";
import { useRouter } from "next/router";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function ProductDetails() {
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

  const deleteProduct = async () => {
    try {
      if (product) {
        await axios.delete(`/api/products/${product.id}`);
        router.push("/");
      }
    } catch (error) {
      setError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>Product Details</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.productDetails}>
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <div className={styles.actions}>
          <Link href={`/edit/${product.id}`}>
            <a className={styles.editButton}>Edit</a>
          </Link>
          <button className={styles.deleteButton} onClick={deleteProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
