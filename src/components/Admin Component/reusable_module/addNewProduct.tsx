import { useCallback, useState, useRef } from "react";
import "../../../../styles/add_new_product.css"
import { addNewProduct } from "@/services/api";

interface ProductDetails {
  price: string;
  title: string;
  quantity: string;
  discount: string;
  category: string;
  description: string;
}

export default function AddNewProduct() {
  const [newProductDetails, setNewProductDetails] = useState<ProductDetails>({
    price: "",
    title: "",
    quantity: "",
    discount: "",
    category: '',
    description: '',
  });
  const [addNewProductMessage, setAddNewProductMessage] = useState("Submit")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Demo/upload function
  const addNewProductDetails = useCallback(async (productDetails: ProductDetails, productFile: FileList) => {
    setIsSubmitting(true);
    try {
      const { price, title, quantity, discount, category, description } = productDetails;
      if (productFile == null || price == '' || quantity == '' || title == "" || category == '' || description == "") {
        setAddNewProductMessage("Input is Empty or Zero")
        return
      }

      // Replace with real API endpoint
      const res = await addNewProduct({
        price,
        title,
        quantity,
        discount,
        category,
        description,
      })
      const { success } = res.data
      if (!success) {
        setAddNewProductMessage("Server Error Adding new product")
        return
      }
      console.log("New Product Added!");
      setAddNewProductMessage("New Product Added")
      // clear form
      setNewProductDetails({
        price: "",
        title: "",
        quantity: "",
        discount: "",
        category: '',
        description: '',
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error("🚀 ~ createNewBlog ~ error:", error);
      setAddNewProductMessage("Server Error")
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (productImage == null) return;
    addNewProductDetails(newProductDetails, productImage);
  }, [addNewProductDetails, newProductDetails, productImage]);

  // const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setNewProductDetails(prev => ({ ...prev, image: file }));
  //     setPreviewUrl(URL.createObjectURL(file));
  //   }
  // }, []);
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    console.log("🚀 ~ handleFileChange ~ file:", file)
    if (file) {
      setProductImage(file);
    }
  }, []);

  return (
    <div className="new_blog_background">
      <div className="card">
        <label className="image_container" onClick={() => fileInputRef.current?.click()}>
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="preview_img" />
          ) : (
            <span className="placeholder_text">Click to upload image</span>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file_input"
          onChange={handleFileChange}
          hidden
        />
        <div className="product_details_wrapper">
          <input
            type="number"
            placeholder="Price"
            className="product_price"
            value={newProductDetails.price}
            onChange={e => setNewProductDetails(prev => ({ ...prev, price: e.target.value }))}
          />

          <input
            type="number"
            placeholder="quantity"
            className="product_quantity"
            value={newProductDetails.quantity}
            onChange={e => setNewProductDetails(prev => ({ ...prev, quantity: e.target.value }))}
          />
          <input
            type="number"
            placeholder="discount"
            className="product_discount"
            value={newProductDetails.price}
            onChange={e => setNewProductDetails(prev => ({ ...prev, discount: e.target.value }))}
          />
          <input
            type="text"
            placeholder="title"
            className="product_title"
            value={newProductDetails.title}
            onChange={e => setNewProductDetails(prev => ({ ...prev, title: e.target.value }))}
          />
          <input
            type="text"
            placeholder="category"
            className="product_category"
            value={newProductDetails.category}
            onChange={e => setNewProductDetails(prev => ({ ...prev, category: e.target.value }))}
          />
        </div>

        <textarea
          title="description"
          id="story"
          name="description"
          rows={5}
          value={newProductDetails.description}
          onChange={e => setNewProductDetails(prev => ({ ...prev, description: e.target.value }))}
        />

        <button
          className="submit_btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : `${addNewProductMessage}`}
        </button>
      </div>
    </div>
  );
}
