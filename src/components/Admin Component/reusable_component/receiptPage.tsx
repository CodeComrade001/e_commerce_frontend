import { JSX, useEffect, useState } from "react";
import "../../../../styles/receipt_module.css";
import { fetchAllBlogPost } from '../../../services/api';
import { blogProduct } from "@/services/dataTypes";

export default function ReceiptComponent(): JSX.Element {
  const [allPaymentReceipt, setAllPaymentReceipt] = useState<blogProduct[] | null>(null);
  const [sideViewItem, setSideViewItem] = useState<blogProduct | null>(null);
  const [isMoreViewReady, setIsMoreViewReady] = useState<boolean>(false);


  function getSideView(sideViewItemIndex: number) {
    allPaymentReceipt !== null &&
      setSideViewItem(allPaymentReceipt[sideViewItemIndex])
    setIsMoreViewReady(true)
  }

  useEffect(() => {
    async function getAllBlogPost() {
      try {
        const response = await fetchAllBlogPost()
        const { result, data } = response.data;
        if (result) {
          setAllPaymentReceipt(data)
          setIsMoreViewReady(true)
        }
      } catch (error) {
        console.log("🚀 ~ getAllBlogPost ~ error:", error)
        setIsMoreViewReady(false)

      } finally {
        setIsMoreViewReady(true)
      }
    }
    getAllBlogPost()
  }, [])


  return (
    <div id="receipt_component">
      <div className="navigation_option">
        <h2>
          All Payment Receipt
        </h2>
        <nav>
          <input type="date" name="" id="" title="search date" />
          <input type="time" name="" id="" title="search time" />
          <button
            title="delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Delete
          </button>
          <button
            title="delete"
          // onClick={() => showNotUploadedProduct()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Don't Upload
          </button>
          <button
            title="delete"
          // onClick={() => showUploadedProduct()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Upload
          </button>
          <button
            title="delete"
          // onClick={() => addProduct(item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Add
          </button>
        </nav>
      </div>
      <div className="all-blog-items">
        {(isMoreViewReady && sideViewItem !== null) &&
          <aside key={sideViewItem.id}
            className={`more_item_side_bar ${isMoreViewReady
              ? 'slide-in'
              : 'slide-out'
              }`}
          >
            <div className="user">Minerva Austin</div>
            <div
              className="close_sidebar"
              onClick={() => setIsMoreViewReady(false)}
            >
              <svg viewBox="0 0 16 16" width="20" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M8 6L8 2L10 2L16 8L10 14L8 14L8 10L-1.74845e-07 10L-3.01991e-07 6L8 6Z" fill="#000000">
                  </path> </g></svg>
            </div>
            <div className="date ordered_at">
              {new Date(sideViewItem.ordered_at).toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",   // optional
                hour12: false        // use true if you want 12-hour AM/PM
              })}
            </div>
            <div className="product_ordered">
              <div className="product_container">
                <div className="each_product_details">
                  <span>
                    <img src={sideViewItem.image_url} alt={sideViewItem.title} />
                  </span>
                  <div className="each_product_details_options">
                    <span className="category" >{sideViewItem.category}</span>
                    <span className="title" >{sideViewItem.title}</span>
                    <span className="qty" >Qty : 2</span>
                    <span className="price" >Price : ${sideViewItem.price}</span>
                  </div>
                  <div className="each_product_details_options description">
                    <span>{sideViewItem.description}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        }
        <div className="product-card-section">
          {allPaymentReceipt !== null &&
            allPaymentReceipt.map((item, index) => (
              <div key={item.id} id="checkout_summary">
                <button
                  onClick={() => getSideView(index)}
                >More </button>
                <div className="blog-card">
                  <img
                    src={item.image_url}
                    alt={item.category}
                    className="blog-card__image"
                  />
                  <div className="blog-card__content">
                    <time className="blog-card__date">{item.ordered_at}</time>
                    <h2 className="blog-card__title">
                      {item.description}
                    </h2>
                    <p className="blog-card__excerpt">
                      {item.moreText}
                    </p>
                  </div>
                  <div className="blog-card__comments">
                    <div className="blog-product-info" >{item.uploaded ? "Uploaded" : "Not Uploaded"} </div>
                    <div className="blog-product-info" >{item.qty} </div>
                    <div className="blog-product-info" >{item.discount} </div>
                    <div className="blog-product-info" >{item.price} </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
