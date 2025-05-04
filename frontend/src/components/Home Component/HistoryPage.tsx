import { JSX, useEffect, useState } from "react";
import "../../../styles/orderHistory.css";
import { useAuth } from "@/context/AuthContext";
import { fetchUserOrderHistory } from "@/services/api";
import { OrderHistoryItem } from "@/services/dataTypes";

export default function OrderHistoryComponent(): JSX.Element {
  const [order, setOrder] = useState<OrderHistoryItem | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchHistory() {
      try {
        if (userId !== null) {
          const response = await fetchUserOrderHistory({ userId });
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    }
    fetchHistory();
  }, [userId]);

  if (!order || order.product_details.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div id="orderHistoryComponent">
      <div className="date_search">
        <input type="date" placeholder="Select date" />
      </div>

      <section id="checkout_summary">
        <div key={order.order_id} className="blog-card">
          <img
            src={order.product_details[0].image_url}
            alt={order.product_details[0].title}
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">
              {new Date(order.ordered_at).toLocaleDateString()}
            </time>

            {order.product_details.map((item, idx) => (
              <div key={idx} className="product-line">
                <h2 className="blog-card__title">{item.title}</h2>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Subtotal: ${(item.price * (item.qty || 1)).toFixed(2)}</p>
              </div>
            ))}

            <p className="blog-card__excerpt">
              Total: $
              {order.product_details
                .reduce((sum, item) => sum + item.price * (item.qty || 1), 0)
                .toFixed(2)}
            </p>
          </div>

          <div className="blog-card__comments">
            <button>
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
      </section>
    </div>
  );
}
