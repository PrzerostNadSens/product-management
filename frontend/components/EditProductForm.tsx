import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import styles from "../pages/styles/Home.module.css";
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface EditProductFormProps {
  productId: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (productId: number) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`/api/products/${product.id}`, product);
      router.push("/");
    } catch (error) {
      setError("Error updating product");
      console.error("Error updating product:", error);
    }
  };

  return (
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
  );
};

export default EditProductForm;
