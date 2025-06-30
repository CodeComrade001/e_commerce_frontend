import { useCallback, useState, useRef, useEffect } from "react";
import "../../../../styles/edit_saved_product.css"
import { UpdateExistingProduct } from "@/services/api";
import { Product } from "@/services/dataTypes";


export default function EditProductDetails({ PreVProductDetails }: { PreVProductDetails: Product }) {
  console.log("🚀 ~ EditProductDetails ~ PreVProductDetails:", PreVProductDetails)
  const [newProductDetails, setNewProductDetails] = useState<Product | null>(null);
  const [addNewProductMessage, setAddNewProductMessage] = useState("Submit")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Demo/upload function
  const UpdateProductDetails = useCallback(async (productDetails: Product, productFile: FileList) => {
    console.log("🚀 ~ UpdateProductDetails ~ productFile:", productFile)
    setIsSubmitting(true);
    try {
      const { id, title, price, description, category, image_url, quantity, discount, } = productDetails;
      if (!id) {
        console.log("🚀 ~ UpdateProductDetails ~ id not found:", id)
        return
      }



      // Replace with real API endpoint
      const res = await UpdateExistingProduct({
        id,
        title,
        price,
        description,
        category,
        image_url,
        quantity,
        discount,
      })
      const { success } = res.data
      if (!success) {
        setAddNewProductMessage("Server Error Adding new product")
        return
      }
      console.log("New Product Added!");
      setAddNewProductMessage("New Product Added")
      // clear form
      setNewProductDetails(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("🚀 ~ createNewBlog ~ error:", error);
      setAddNewProductMessage("Server Error")
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (productImage == null || newProductDetails == null) return;
    UpdateProductDetails(newProductDetails, productImage);
  }, [UpdateProductDetails, newProductDetails, productImage]);

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

  useEffect(() => {
    setNewProductDetails(PreVProductDetails)
  }, [PreVProductDetails])


  return (
    <div className="new_blog_background">
      <div className="card">
        <label className="image_container" onClick={() => fileInputRef.current?.click()}>
          {previewUrl ? (
            <img src={previewUrl} alt="preview"
              style={
                newProductDetails?.image_url
                  ? {
                    backgroundImage: `url(${newProductDetails.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                  : {}
              }
              className="preview_img" />
          ) : (
            <span className="placeholder_text">Click to upload image</span>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file_input"
          hidden
          onChange={handleFileChange}
        />
        {newProductDetails !== null &&
          (<>
            {/* <img src={newProductDetails.image_url} alt="" /> */}
            <div className="product_details_wrapper">
              <input
                type="number"
                placeholder="Price"
                className="product_price"
                value={newProductDetails?.price ?? 0}
                onChange={e =>
                  setNewProductDetails(prev =>
                    prev
                      ? { ...prev, price: e.target.valueAsNumber }
                      : null
                  )
                }
              />

              <input
                type="number"
                placeholder="quantity"
                className="product_quantity"
                value={newProductDetails?.quantity ?? 0}
                onChange={e =>
                  setNewProductDetails(prev =>
                    prev
                      ? { ...prev, quantity: e.target.value }
                      : null
                  )
                }
              />
              <input
                type="number"
                placeholder="discount"
                className="product_discount"
                value={newProductDetails.price}
                onChange={e =>
                  setNewProductDetails(prev =>
                    prev
                      ? { ...prev, discount: e.target.valueAsNumber }
                      : null
                  )
                }
              />
              <input
                type="text"
                placeholder="title"
                className="product_title"
                value={newProductDetails.title}
                onChange={e => setNewProductDetails(prev =>
                  prev
                    ? { ...prev, title: e.target.value }
                    : null
                )}
              />
              <input
                type="text"
                placeholder="category"
                className="product_category"
                value={newProductDetails.category}
                onChange={e => setNewProductDetails(prev =>
                  prev
                    ? { ...prev, category: e.target.value }
                    : null
                )}
              />
            </div>
            <textarea
              title="description"
              id="story"
              name="description"
              rows={5}
              value={newProductDetails.description}
              onChange={e => setNewProductDetails(prev =>
                prev
                  ? { ...prev, description: e.target.value }
                  : null
              )}
            />
          </>
          )
        }



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
