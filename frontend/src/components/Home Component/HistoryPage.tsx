import { JSX } from "react";
import "../../../styles/orderHistory.css"

export default function OrderHistoryComponent(): JSX.Element {

  return (
    <div id="orderHistoryComponent">
      <div className="date_search">
        <input type="date" name="" id="" placeholder="select_date" />
      </div>

      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="https://images.unsplash.com/photo-1615147342761-9238e15d8b96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <button>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path></svg>
              </i>
              View
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}