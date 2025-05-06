/* LandingHomePage.tsx */
import { JSX, useCallback, useEffect, useState } from "react";
import "../../../styles/landing_page.css";
import { CategoryGroup, Product, SpecialDealsProduct } from "@/services/dataTypes";
import { useProductContext } from "@/context/ProductContext";
import { getDealsProduct, getRandomProduct } from "@/services/api";

export default function LandingHomePage(): JSX.Element {
  const [randomProduct, setRandomProduct] = useState<CategoryGroup[]>([])
  console.log("🚀 ~ LandingHomePage ~ randomProduct:", randomProduct)
  const [dealsProduct, setDealsProduct] = useState<SpecialDealsProduct[]>([])
  console.log("🚀 ~ LandingHomePage ~ dealsProduct:", dealsProduct)
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { addProduct, cartProducts } = useProductContext();
  // Kick off animations on mount
  useEffect(() => {
    const root = document.querySelector(".landing_page");
    root?.classList.add("ready");
  }, []);

  function confirmOrder() {
  }

  const fetchRandomProduct = useCallback(async () => {
    try {
      const response = await getRandomProduct()
      console.log("🚀 ~ fetchRandomProduct ~ response:", response)
      console.log("🚀 ~ fetchRandomProduct ~ response.data:", response.data)
    } catch (error: unknown) {
      console.log("🚀 ~ fetchRandomProduct ~ error:", error)
    }
  }, [])

  const fetchDealsProduct = useCallback(async () => {
    try {
      const response = await getDealsProduct()
      console.log("🚀 ~ fetchDealsProduct ~ response:", response)
      console.log("🚀 ~ fetchDealsProduct ~ response.data:", response.data)
    } catch (error: unknown) {
      console.log("🚀 ~ fetchRandomProduct ~ error:", error)
    }
  }, [])

  useEffect(() => {

    fetchRandomProduct()
    fetchDealsProduct()
  }, [])

  const products = randomProduct[categoryIndex]?.products ?? [];
  return (
    <div className="landing_page">

      <header className="header ">
        <div className="logo">E-Commerce Project</div>
        <nav>
          <ul>
            <li><a href="#featured">Featured</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#deals">Deals</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button className="btn-search">🔍</button>
          <button className="btn-cart">🛒{cartProducts.length} </button>
          <button className="btn-user">👤</button>
        </div>
      </header>
      <section className="hero">
        <div className="background_image">
          <img src="images/random/home1-banner3.jpg" alt="" />
        </div>
        <div className="hero-content">
          <h1>Experience <span>Shopping</span> in 3D</h1>
          <p>Discover our latest collection with immersive 3D experiences</p>
          <button className="btn-primary">Shop Now</button>
        </div>
        <div id="hero-model-container" className="model-container"></div>
      </section>

      <section id="featured" className="featured-products">
        <h2>Featured Products
          <button>
            More
          </button>
        </h2>
        <div className="product-carousel">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="product_container">
                <img src={item.image_url} alt="" />
                <div className="information">
                  {item.title}
                </div>
                <nav>
                  <button className="price">
                    {`$${item.price}`}
                  </button>
                  <button
                    title="add"
                    onClick={() => addProduct(item)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                    Add to cart
                  </button>
                  <button title="checkout"
                    onClick={() => confirmOrder()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    checkout
                  </button>
                </nav>
              </div>)
            )) : (
            // <div>No products found in "{randomProduct[categoryIndex]?.category}"</div>
            <>
              {/* 1 */}
              <div className="product_container">
                <img src="/images/checkout/7.jpg" alt="Barista Pro Espresso Machine" />
                <div className="information">Barista Pro Espresso Machine</div>
                <nav>
                  <button className="price">$249.99</button>
                  <button title="add" onClick={() => addProduct({
                    id: 101,
                    title: "Barista Pro Espresso Machine",
                    price: 249.99,
                    description: "15‑bar pump with thermocoil boiler for perfect crema.",
                    category: "Kitchen Appliances",
                    image_url: "",
                  })}>
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>Checkout</button>
                </nav>
              </div>

              {/* 2 */}
              <div className="product_container">
                <img src="/images/checkout/8.jpg" alt="TrailRunner 3000 GPS Shoes" />
                <div className="information">TrailRunner 3000 GPS Shoes</div>
                <nav>
                  <button className="price">$149.50</button>
                  <button title="add" onClick={() => addProduct({
                    id: 102,
                    title: "TrailRunner 3000 GPS Shoes",
                    price: 149.50,
                    description: "Lightweight runners with built‑in GPS and heart‑rate monitor.",
                    category: "Footwear",
                    image_url: "",
                  })}>
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>Checkout</button>
                </nav>
              </div>

              {/* 3 */}
              <div className="product_container">
                <img src="/images/checkout/9.jpg" alt="RoadMaster Leather Biking Jacket" />
                <div className="information">RoadMaster Leather Biking Jacket</div>
                <nav>
                  <button className="price">$239.20</button>
                  <button title="add" onClick={() => addProduct({
                    id: 103,
                    title: "RoadMaster Leather Biking Jacket",
                    price: 239.20,
                    description: "Durable cowhide jacket with CE‑approved armor panels.",
                    category: "Apparel",
                    image_url: "",
                  })}>
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>Checkout</button>
                </nav>
              </div>

              {/* 4 */}
              <div className="product_container">
                <img src="/images/checkout/10.jpg" alt="SolarFlex 200W Portable Panel" />
                <div className="information">SolarFlex 200W Portable Panel</div>
                <nav>
                  <button className="price">$296.65</button>
                  <button title="add" onClick={() => addProduct({
                    id: 104,
                    title: "SolarFlex 200W Portable Panel",
                    price: 296.65,
                    description: "Foldable, weather‑resistant panel with fast‑charge USB ports.",
                    category: "Outdoor Gear",
                    image_url: "",
                  })}>
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>Checkout</button>
                </nav>
              </div>
            </>
          )}
        </div>
      </section >

      <section id="collections" className="collections">
        <div className="collection-info">
          <h2>New Season Collection</h2>
          <p>Explore our latest arrivals with exclusive deals</p>
          <button className="btn-secondary">View Collection</button>
        </div>
        <div id="collection-model-container" className="model-container"></div>
      </section>

      <section id="deals" className="deals">
        <h2>Limited Time Offers</h2>
        <div className="deals-grid">
          {dealsProduct.length > 0 ? (
            dealsProduct.map((item) => (
              <div key={item.id} className="product_container">
                <img src={item.image_url} alt="" />
                <div className="information">
                  <p> {item.title}</p>

                </div>
                <nav>
                  <button className="price">
                    {/* strike through */}
                    <span>{`$${item.oldPrice}`}</span>``
                    <span>{item.discount}</span>
                    <span>{item.newPrice}</span>
                  </button>
                  <button
                    title="add"
                    onClick={() =>
                      addProduct(item)
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                    Add to cart
                  </button>
                  <button title="checkout"
                    onClick={() => confirmOrder()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    checkout
                  </button>
                </nav>
              </div>)
            )) : (
            // <div>No products found in "{randomProduct[categoryIndex]?.category}"</div>
            <>
              {/* Deal #1 */}
              <div className="product_container">
                <img src="/images/checkout/7.jpg" alt="SoundWave Wireless Earbuds" />
                <div className="information">
                  <p>SoundWave Wireless Earbuds</p>
                </div>
                <nav>
                  <button className="price">
                    <span className="old-price">$129.99</span>
                    <span className="discount">–25%</span>
                    <span className="new-price">$97.49</span>
                  </button>
                  <button
                    title="add"
                  // onClick={() => addProduct({
                  //   id: 501,
                  //   title: "SoundWave Wireless Earbuds",
                  //   price: 97.49,
                  //   description: "Noise‑cancelling Bluetooth earbuds with 30‑hour battery life.",
                  //   category: "Audio",
                  //   image_url: "",
                  //   discount: 25,
                  // })}
                  >
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>
                    Checkout
                  </button>
                </nav>
              </div>

              {/* Deal #2 */}
              <div className="product_container">
                <img src="/images/checkout/8.jpg" alt="EcoLite Fitness Tracker" />
                <div className="information">
                  <p>EcoLite Fitness Tracker</p>
                </div>
                <nav>
                  <button className="price">
                    <span className="old-price">$79.99</span>
                    <span className="discount">–30%</span>
                    <span className="new-price">$55.99</span>
                  </button>
                  <button
                    title="add"
                  // onClick={() => addProduct({
                  //   id: 502,
                  //   title: "EcoLite Fitness Tracker",
                  //   price: 55.99,
                  //   description: "Waterproof tracker with heart‑rate monitor and sleep analysis.",
                  //   category: "Wearables",
                  //   image_url: "",
                  //   discount: 30,
                  // })}
                  >
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>
                    Checkout
                  </button>
                </nav>
              </div>

              {/* Deal #3 */}
              <div className="product_container">
                <img src="/images/checkout/9.jpg" alt="UltraClean Robot Vacuum" />
                <div className="information">
                  <p>UltraClean Robot Vacuum</p>
                </div>
                <nav>
                  <button className="price">
                    <span className="old-price">$399.99</span>
                    <span className="discount">–20%</span>
                    <span className="new-price">$319.99</span>
                  </button>
                  <button
                    title="add"
                  // onClick={() => addProduct({
                  //   id: 503,
                  //   title: "UltraClean Robot Vacuum",
                  //   price: 319.99,
                  //   description: "Smart mapping vacuum with app control and 120‑minute runtime.",
                  //   category: "Home Appliances",
                  //   image_url: "",
                  //   discount: 20,
                  // })}
                  >
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>
                    Checkout
                  </button>
                </nav>
              </div>

              {/* Deal #4 */}
              <div className="product_container">
                <img src="/images/checkout/10.jpg" alt="GlidePro Electric Scooter" />
                <div className="information">
                  <p>GlidePro Electric Scooter</p>
                </div>
                <nav>
                  <button className="price">
                    <span className="old-price">$549.00</span>
                    <span className="discount">–15%</span>
                    <span className="new-price">$466.65</span>
                  </button>
                  <button
                    title="add"
                  // onClick={() => addProduct({
                  //   id: 504,
                  //   title: "GlidePro Electric Scooter",
                  //   price: 466.65,
                  //   description: "Foldable e‑scooter with LED display and 25‑mile range.",
                  //   category: "Outdoor Mobility",
                  //   image_url: "",
                  //   discount: 15,
                  // })}
                  >
                    Add to cart
                  </button>
                  <button title="checkout" onClick={() => confirmOrder()}>
                    Checkout
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
      </section >

      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Shop</h3>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sale</a></li>
              <li><a href="#">All Products</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: info@3dshop.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 E-Commerce St, Digital City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 3D Shop. All Rights Reserved.</p>
        </div>
      </footer>
    </div >
  );
}