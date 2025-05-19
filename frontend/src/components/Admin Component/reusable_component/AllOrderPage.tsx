import { JSX, useCallback, useEffect, useState } from "react";
import "../../../../styles/allAdminOrder.css"
import { cancelAdminOrder, completeAdminOrder, fetchAdminAllOrders } from "@/services/api";
import { OrderCategoryGroup } from "@/services/dataTypes";

export default function AllOrderComponent(): JSX.Element {
  const [allOrder, setAllOrder] = useState<OrderCategoryGroup[]>([]);
  console.log("🚀 ~ allOrder:", allOrder)
  const [sideViewItem, setSideViewItem] = useState<OrderCategoryGroup | null>(null);
  const [isMoreViewReady, setIsMoreViewReady] = useState<boolean>(false);
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [isOrderCanceled, setIsOrderCanceled] = useState<boolean>(false);
  console.log("🚀 ~ AllOrderComponent ~ isMoreViewReady:", isMoreViewReady)

  function setSideViewIndex(arrayIndex: number) {
    const sideViewData = allOrder[arrayIndex]
    console.log("🚀 ~ setSideViewIndex ~ sideViewData:", sideViewData)
    setSideViewItem(sideViewData)
    setIsMoreViewReady(true)
  }

  const cancelOrder = useCallback(async (orderId: number) => {
    try {
      const response = await cancelAdminOrder(orderId)
      const { result } = response.data
      if (result) {
        setIsOrderCanceled(true)
      }
    } catch (error: unknown) {
      console.log("🚀 ~ cancelOrder ~ error:", error)
      setIsOrderCanceled(false)
    }
  }, [])
  const completedOrder = useCallback(async (orderId: number) => {
    try {
      const response = await completeAdminOrder(orderId)
      const { result } = response.data
      if (result) {
        setIsOrderComplete(true)
      }
    } catch (error: unknown) {
      console.log("🚀 ~ completedOrder ~ error:", error)
      setIsOrderComplete(false)
    }
  }, [])

  useEffect(() => {
    // 2. Define and call async fetch inside useEffect
    async function loadProducts() {
      try {
        const response = await fetchAdminAllOrders();   // wait for Axios
        console.log('Fetched products:', response.data);  // DevTools console
        const { result, data } = response.data;
        if (result) {
          setAllOrder(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();
  }, []);



  return (
    <div className="Admin_All_orders">
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
          <div className="user_email">{sideViewItem.user_id_gmail}</div>
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
            {sideViewItem.products.map((details, idx) => {
              return (
                <div key={idx} className="product_container">
                  <div key={details.id} className="each_product_details">
                    <span>
                      <img src={details.image_url} alt={details.title} />
                    </span>
                    <div className="each_product_details_options">
                      <span className="category" >{details.category}</span>
                      <span className="title" >{details.title}</span>
                      <span className="qty" >Qty : 2</span>
                      <span className="price" >Price : ${details.price}</span>
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
      <div className="navigation_option">
        <h2>
          All Orders
        </h2>
        <nav>
          <input type="date" name="" id="" title="search date" />
          <input type="time" name="" id="" title="search time" />
          <button
            title="delete"
          // onClick={() => addProduct(item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Completed
          </button>
          <button
            title="delete"
          // onClick={() => cancelOrder(item.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Cancelled
          </button>
          <button
            title="delete"
          // onClick={() => addProduct(item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            Delete all
          </button>
        </nav>
      </div>
      <div className="all_orders_container">
        {allOrder.length > 0 &&
          allOrder.map((items, index) => (
            <div key={items.id} className="product_ordered">
              <div className="price_payment">
                ${items.products
                  .reduce((sum, product) => sum + product.price, 0)}
              </div>
              <div
                onClick={() => setSideViewIndex(index)}
                className="more_info"
              >
                More
              </div>
              <div className="image_container">
                {Array.from({ length: 4 }).map((_, idx) => {
                  const product = items.products[idx];
                  return (
                    <span key={idx}>
                      {product
                        ? <img src={product.image_url} alt={product.title} />
                        : <div className="placeholder" />}
                    </span>
                  );
                })}
              </div>
              <div className="options">
                <button className="user_email">{items.user_id_gmail}</button>

                <button className="date">
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
                </button>
                <button
                  className="cancel"
                  onClick={() => cancelOrder(items.id)}
                >
                  {!isOrderCanceled ? "Canceled" : "Order Canceled"}
                </button>
                <button className="mark">mark</button>
                <button
                  className="done"
                  onClick={() => completedOrder(items.id)}
                >
                  {!isOrderComplete ? "Complete" : "Order Completed"}
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="more_items">
        <button className="next_page">Prev Items</button>
        <button className="prev_page">Next Items</button>
      </div>
    </div >
  )
}