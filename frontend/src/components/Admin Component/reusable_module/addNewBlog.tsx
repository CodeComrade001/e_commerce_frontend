import { useCallback, useState, useRef } from "react";
import "../../../../styles/add_new_blog_message.css"

interface BlogMessage {
  price: string;
  discount: string;
  category: string;
  story: string;
  image?: File;
}

export default function AddNewBlogMessage() {
  const [newBlogMessage, setNewBlogMessage] = useState<BlogMessage>({
    price: "",
    discount: "",
    category: "",
    story: "It was a dark and stormy night..."
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Demo/upload function
  const addNewBlogMessage = useCallback(async (message: BlogMessage) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("price", message.price);
      formData.append("discount", message.discount);
      formData.append("story", message.story);
      if (message.image) formData.append("image", message.image);

      // Replace with real API endpoint
      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      console.log("Blog submitted!");
      // clear form
      setNewBlogMessage({ price: "", discount: "", story: "", category: "" });
      setPreviewUrl(null);
    } catch (error) {
      console.error("🚀 ~ createNewBlog ~ error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    addNewBlogMessage(newBlogMessage);
  }, [addNewBlogMessage, newBlogMessage]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBlogMessage(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
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
            value={newBlogMessage.price}
            onChange={e => setNewBlogMessage(prev => ({ ...prev, price: e.target.value }))}
          />

          <input
            type="number"
            placeholder="Discount"
            className="product_discount"
            value={newBlogMessage.discount}
            onChange={e => setNewBlogMessage(prev => ({ ...prev, discount: e.target.value }))}
          />
          <input
            type="text"
            placeholder="category"
            className="product_category"
            value={newBlogMessage.price}
            onChange={e => setNewBlogMessage(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>

        <textarea
          title="Story"
          id="story"
          name="story"
          rows={5}
          value={newBlogMessage.story}
          onChange={e => setNewBlogMessage(prev => ({ ...prev, story: e.target.value }))}
        />

        <button
          className="submit_btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
