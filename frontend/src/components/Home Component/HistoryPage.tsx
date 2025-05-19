import { JSX, useEffect, useState } from "react";
import "../../../styles/orderHistory.css";
import { useAuth } from "@/context/AuthContext";
import { fetchUserOrderHistory } from "@/services/api";
import { historyOrders, OrderHistoryItem } from "@/services/dataTypes";

export default function OrderHistoryComponent(): JSX.Element {
  const [order, setOrder] = useState<OrderHistoryItem[]>([]);
  console.log("🚀 ~ OrderHistoryComponent ~ order:", order)
  const { userId } = useAuth();
  const [sideViewItem, setSideViewItem] = useState<historyOrders | null>(null);
  const [isMoreViewReady, setIsMoreViewReady] = useState<boolean>(false);


  function setSideViewIndex(arrayIndex: number) {
    const sideViewData = order[arrayIndex]
    console.log("🚀 ~ setSideViewIndex ~ sideViewData:", sideViewData)
    setSideViewItem(sideViewData)
    setIsMoreViewReady(true)
  }

  useEffect(() => {
    async function fetchHistory() {
      try {
        if (userId !== null) {
          const response = await fetchUserOrderHistory({ userId });
          const { result, user } = response.data
          console.log("🚀 ~ fetchHistory ~ response:", response.data)
          if (result) {
            setOrder(user);
          }
          console.log("no order placed")
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    }
    fetchHistory();
  }, [userId]);

  if (order == null || order.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div id="orderHistoryComponent">
      {(isMoreViewReady && sideViewItem !== null) &&
        <aside key={0}
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
            {sideViewItem.product_details.map((details, idx) => {
              return (
                <div key={idx} className="product_container">
                  <div key={details.id} className="each_product_details">
                    <span>
                      <img src={details.image_url} alt={details.title} />
                    </span>
                    <div className="each_product_details_options">
                      <span className="category" >{details.category}</span>
                      <span className="title" >{details.title}</span>
                      <span className="qty" >{details.qty}</span>
                      <span className="price" >Price : ${details.price}</span>
                      <span className="price" >Total Price : ${details.price * details.qty}</span>
                    </div>
                    <div className="each_product_details_options description">
                      <span>{details.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      }
      <div className="date_search">
        <input type="date" placeholder="Search Date" />
      </div>

      <section id="checkout_summary">
        {order.length > 0 &&
          order.map((items, index) => (
            <div key={items.order_id} className="blog-card">
              <img
                src={items.product_details[0].image_url}
                alt={items.product_details[0].title}
                className="blog-card__image"
              />
              <div className="blog-card__content">
                <div className="blog-card__date">
                  {new Date(items.ordered_at).toLocaleString("en-GB", {
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
                <div className="product_sum">

                  {items.product_details.map((item, idx) => (
                    <div key={idx} className="product-line">
                      <h2 className="blog-card__title">{item.title}</h2>
                      <p>Qty: {item.qty}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p>Subtotal: ${(item.price * (item.qty || 1)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <p className="blog-card__excerpt">
                  Total: $
                  {items.product_details
                    .reduce((sum, item) => sum + item.price * (item.qty || 1), 0)
                    .toFixed(2)}
                </p>
              </div>

              <div className="blog-card__comments">
                <button
                  onClick={() => setSideViewIndex(index)}
                >
                  <i>
                    {/* eye icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 
                    1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </i>
                  View
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
