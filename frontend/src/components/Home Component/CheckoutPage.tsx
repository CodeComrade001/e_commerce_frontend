import { JSX, useCallback, useEffect, useState } from 'react';
import '../../../styles/orderSummary.css';
import { useProductContext } from '@/context/ProductContext';
import { placeNewOrder } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
// src/features/user/types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  qty?: number;
}

export interface OrderRequest {
  userId: number;
  products: Product[];
}

export default function OrderSummary(): JSX.Element {
  const { userId } = useAuth();
  console.log("🚀 ~ OrderSummary ~ userId:", userId)
  const { cartProducts, removeProduct, updateQuantity } = useProductContext();
  console.log("🚀 ~ OrderSummary ~ cartProducts:", cartProducts)

  const handleQtyChange = (id: number, delta: number) => {
    const prod = cartProducts.find(p => p.id === id);
    if (prod) updateQuantity(id, (prod.qty || 1) + delta);
  };

  const placeOrder = useCallback(async () => {
    console.log("🚀 ~ placeOrder ~ placeOrder:", placeOrder)
    try {
      if (userId !== null) {
        const payload: OrderRequest = {
          userId,
          products: cartProducts.map(p => ({
            ...p,
            qty: p.qty ?? 1
          }))
        };
        console.log("🚀 ~ placeOrder ~ payload:", payload)
        const response = await placeNewOrder(payload);
        console.log('Order created:', response);
      }
    } catch (err) {
      console.error('placeOrder error user has not logged in', err);
    }
  }, [userId, cartProducts]);

  return (
    <div className="order-summary-section">
      <h1>Order Summary</h1>
      <p className="order-date">Placed on October 12, 2023</p>

      <div className="order-details-container">
        <div className="order-items-container">
          <h2>Items in Your Order</h2>
          <div className="order-items-wrapper">
            {cartProducts.map((item, idx) => (
              <div className="order-item" key={idx}>
                <div className="item-image">
                  <img src={item.image_url} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.category}</h3>
                  <p className="item-variant">
                    {item.title}
                  </p>
                  <div className="item-price-qty">
                    <span className="item-price">${item.price}</span>
                    <span className="item-quantity">
                      <button
                        title="add"
                        onClick={() => handleQtyChange(item.id, -1)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-patch-minus-fill" viewBox="0 0 16 16">
                          <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM6 7.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1" />
                        </svg>
                      </button>
                      qty: {item.qty}
                      <button
                        title="delete"
                        onClick={() => handleQtyChange(item.id, 1)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="order-sidebar">
          <div className="payment-summary">
            <h2>Payment Summary</h2>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>$789.95</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>$12.99</span>
            </div>
            <div className="summary-line">
              <span>Tax</span>
              <span>$65.23</span>
            </div>
            <div className="summary-line discount">
              <span>Promo (GAMER10)</span>
              <span>-$78.99</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>$789.18</span>
            </div>
            <button className="checkout-btn">
              <i className="fas fa-arrow-right" >
                <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M294.957,478.609c-27.619,0-50.087-22.468-50.087-50.087c0-9.223-7.479-16.696-16.696-16.696H16.696 C7.479,411.826,0,419.299,0,428.522C0,474.554,37.446,512,83.478,512h211.478c9.217,0,16.696-7.473,16.696-16.696 C311.652,486.082,304.174,478.609,294.957,478.609z"></path> </g> </g> <g> <g> <path d="M510.239,209.576l-33.391-66.783c-2.826-5.658-8.608-9.228-14.935-9.228s-12.109,3.571-14.935,9.228l-33.391,66.783 c-1.152,2.321-1.761,4.875-1.761,7.467v16.696H512v-16.696C512,214.451,511.391,211.897,510.239,209.576z"></path> </g> </g> <g> <g> <rect x="411.826" y="267.13" width="100.174" height="144.696"></rect> </g> </g> <g> <g> <path d="M411.826,445.217v16.696c0,27.619,22.468,50.087,50.087,50.087C489.532,512,512,489.532,512,461.913v-16.696H411.826z"></path> </g> </g> <g> <g> <path d="M428.522,0H150.261c-46.032,0-83.478,37.446-83.478,83.478v294.956h161.391c27.619,0,50.087,22.468,50.087,50.087 c0,9.206,7.49,16.696,16.696,16.696c27.569,0,49.99,22.39,50.072,49.94c20.239-15.246,33.406-39.401,33.406-66.636V100.174h116.87 c9.217,0,16.696-7.473,16.696-16.696C512,37.446,474.554,0,428.522,0z M150.261,333.913c-9.22,0-16.696-7.475-16.696-16.696 s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696S159.481,333.913,150.261,333.913z M150.261,267.13 c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 C166.957,259.655,159.481,267.13,150.261,267.13z M150.261,200.348c-9.22,0-16.696-7.475-16.696-16.696 c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696C166.957,192.873,159.481,200.348,150.261,200.348z M150.261,133.565c-9.22,0-16.696-7.475-16.696-16.696s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 S159.481,133.565,150.261,133.565z M294.957,333.913h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,326.44,304.174,333.913,294.957,333.913z M294.957,267.13h-77.913c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913 c9.217,0,16.696,7.473,16.696,16.696C311.652,259.657,304.174,267.13,294.957,267.13z M294.957,200.348h-77.913 c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696 C311.652,192.875,304.174,200.348,294.957,200.348z M294.957,133.565h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,126.092,304.174,133.565,294.957,133.565 z M381.293,66.783c6.892-19.435,25.456-33.391,47.229-33.391c21.772,0,40.337,13.956,47.229,33.391H381.293z"></path> </g> </g> </g></svg>
              </i>
              Complete Checkout
            </button>
          </div>

          <div className="shipping-info">
            <button className="edit-information" >
              Edit details
            </button>
            <h2>Shipping Information</h2>
            <div className="info-block">
              <h3>Shipping Address</h3>
              <address>
                John Smith<br />
                123 Main Street<br />
                Apt 4B<br />
                New York, NY 10001<br />
                United States
              </address>
            </div>

            <div className="info-block">
              <h3>Shipping Method</h3>
              <p>Express Delivery (2-3 business days)</p>
            </div>

            <div className="info-block">
              <h3>Estimated Delivery</h3>
              <p>October 15 - October 16, 2023</p>
            </div>

            <div className="tracking-info">
              <i className="fas fa-truck" />
              <span>Tracking number will be provided when your order ships</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="order-actions">
        <button className="action-btn cancel">
          <i className="fas fa-times">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </i>
          Cancel Order
        </button>
        <button className="action-btn track">
          <i className="fas fa-map-marker-alt" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
          </i>
          Track Order
        </button>
        <button
          className="action-btn support"
          onClick={() => placeOrder()}
        >
          <i className="fas fa-headset" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
          </i>
          Place Order
        </button>
      </div>
    </div >
  );
};


