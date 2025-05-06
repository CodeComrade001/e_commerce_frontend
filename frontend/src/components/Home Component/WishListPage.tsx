import { JSX, useCallback, useEffect, useState } from "react";
import "../../../styles/wishlist.css"
import { useAuth } from "@/context/AuthContext";
import { fetchAllWishlistOrder, wishlistDeleteOrder } from "@/services/api";
import { WishlistItem } from "@/services/dataTypes";
import { useProductContext } from "@/context/ProductContext";

export default function WishlistComponent({
  checkoutProps,
}: {
  checkoutProps: (data: string) => void;
}): JSX.Element {
  const { addProduct, cartProducts } = useProductContext();
  const { userId } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  function confirmOrder() {
    if (cartProducts.length > 0) {
      console.log("user  selected a product")
      checkoutProps("Checkout")
    } else (
      console.log("user did not select a product")
    )
  }



  const parseProductToBeAdded = useCallback(async (item: WishlistItem) => {
    try {
      if (userId == null) return;

      // Add the product to the cart
      addProduct({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image_url: item.image_url,
      });
    } catch (error) {
      console.log("🚀 ~ deleteFromWishList ~ error:", error)
    }
  }, [])

  const deleteFromWishList = useCallback(async (productId: number) => {
    try {
      if (userId == null) return;
      const response = await wishlistDeleteOrder({
        userId,
        productId
      })
      console.log("🚀 ~ deleteFromWishList ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ deleteFromWishList ~ error:", error)
    }
  }, [])

  useEffect(() => {
    async function loadWishlist() {
      if (userId == null) return;

      try {
        const response = await fetchAllWishlistOrder({ userId });
        // assuming your API returns the list in response.data
        const { result, wishlistData } = response.data;
        if (result) {
          setWishlist(wishlistData);
        }
        console.log("no items found")
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    }

    loadWishlist();
    // re-run if userId ever changes
  }, [userId]);


  return (
    <div id="wishlistComponent">

      <section id="checkout_summary">
        {wishlist.length === 0
          ? <p>No items in your wishlist.</p>
          :

          // {wishlist.map((items) => ( /* … */ ))} 
          wishlist.map((items) => (
            <div key={items.wishlist_id} className="blog-card">
              <img
                src={items.image_url}
                alt="brown couch"
                className="blog-card__image"
              />
              <div className="blog-card__content">
                <time className="blog-card__date">
                  {new Date(items.created_at).toLocaleDateString()}
                </time>
                <h2 className="blog-card__title">
                  {items.title}
                </h2>
                <p className="blog-card__excerpt">
                  {items.category} <br />
                  ${items.price}<br />
                </p>
              </div>
              <div className="blog-card__comments">
                <button
                  onClick={() => confirmOrder()}
                >
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16"><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"></path></svg>
                  </i>
                  Checkout
                </button>
                <button
                  onClick={() => deleteFromWishList(items.id)}
                >
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"></path></svg>
                  </i>
                  delete
                </button>
                <button
                  onClick={() => parseProductToBeAdded(items)}
                >
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path></svg>
                  </i>
                  Add
                </button>
              </div>
            </div>
          ))
        }
      </section>

    </div>
  )
}