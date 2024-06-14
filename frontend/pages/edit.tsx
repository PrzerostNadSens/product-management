import EditProductForm from "../components/EditProductForm";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <p>Invalid product id</p>;
  }

  const productId = parseInt(id);

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <EditProductForm productId={productId} />
    </div>
  );
}
