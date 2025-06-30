/* LandingHomePage.tsx */
import { JSX, useCallback, useEffect, useState } from "react";
import "../../../styles/landing_page.css";
import { Product } from "@/services/dataTypes";
import { useProductContext } from "@/context/ProductContext";
import { getLandingPageProduct } from "@/services/api";

export default function LandingHomePage(): JSX.Element {
  const [randomProduct, setRandomProduct] = useState<Product[]>([])
  console.log("🚀 ~ LandingHomePage ~ randomProduct:", randomProduct)
  const [dealsProduct, setDealsProduct] = useState<Product[]>([])
  console.log("🚀 ~ LandingHomePage ~ dealsProduct:", dealsProduct)
  const { addProduct, cartProducts } = useProductContext();
  // Kick off animations on mount
  useEffect(() => {
    const root = document.querySelector(".landing_page");
    root?.classList.add("ready");
  }, []);

  function confirmOrder() {
  }

  const fetchRootProduct = useCallback(async () => {
    try {
      const response = await getLandingPageProduct()
      console.log("🚀 ~ fetchDealsProduct ~ response:", response)
      console.log("🚀 ~ fetchDealsProduct ~ response.data:", response.data)
      const { featured, limited } = response.data;
      setRandomProduct(featured)
      setDealsProduct(limited)
    } catch (error: unknown) {
      console.log("🚀 ~ fetchRandomProduct ~ error:", error)
    }
  }, [])


  useEffect(() => {
    fetchRootProduct()
  }, [])

  return (
    <div className="landing_page">
      <header className="header ">
        <div className="logo">E-Commerce Project</div>
        <nav>
          <ul>
            <li><a href="#featured">
              <i>
                <svg
                  fill="#000000"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  enableBackground="new 0 0 32 32"
                  id="Glyph"
                  version="1.1"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2 s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046 l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624 c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436 C29.958,14.027,30.136,13.243,29.895,12.52z"
                      id="XMLID_328_"
                    />
                  </g>
                </svg>
              </i>
              Featured
            </a>
            </li>
            <li><a href="#collections">
              <i>
                <svg
                  height="20"
                  width="20"
                  fill="#000000"
                  viewBox="0 0 1920 1920"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M1242.353 677.647V1920H0V677.647h1242.353Zm-338.824 790.588H338.824v112.941h564.705v-112.94Zm677.647-1129.411v1242.352h-225.882V564.706H338.824V338.824h1242.352Zm-790.475 903.529H338.824v112.941H790.7v-112.941ZM1920.034-.011v1242.353h-225.882V225.872H677.68V-.012h1242.353ZM903.529 1016.47H338.824v112.94h564.705v-112.94Z"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>

              </i>
              Collections
            </a>
            </li>
            <li><a href="#deals">
              <svg
                height="20"
                width="20"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      className="st0"
                      d="M263.621,160.53c-5.626,0-9.207,2.34-10.772,7.19c-0.938,2.806-1.256,5.936-1.256,29.207
           c0,23.264,0.318,26.394,1.256,29.199c1.565,4.85,5.146,7.191,10.772,7.191c5.47,0,9.221-2.34,10.786-7.191
           c0.93-2.805,1.241-5.935,1.241-29.199c0-23.27-0.31-26.401-1.241-29.207C272.842,162.871,269.091,160.53,263.621,160.53z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M184.39,295.46c-7.282,0-11.97,3.645-13.923,9.757c-1.044,3.123-1.432,7.423-1.432,19.006
           c0,11.582,0.388,15.883,1.432,18.998c1.953,6.119,6.641,9.764,13.923,9.764c7.289,0,11.978-3.645,13.93-9.764
           c1.043-3.116,1.438-7.416,1.438-18.998c0-11.583-0.395-15.883-1.438-19.006C196.368,299.105,191.679,295.46,184.39,295.46z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M512,255.996l-63.299-51.631l29.002-76.362l-80.641-13.07L384,34.3l-76.361,29.002L256,0.004l-51.638,63.299
           L128.007,34.3l-13.07,80.634l-80.633,13.07l28.995,76.362L0,255.996l63.299,51.632l-28.995,76.368l80.633,13.07l13.07,80.633
           l76.355-29.002L256,511.996l51.638-63.298L384,477.7l13.063-80.633l80.641-13.07l-29.002-76.368L512,255.996z
           M150.009,226.6l16.877-3.278c0.923-0.162,1.55,0.31,1.868,1.255c1.874,4.991,5.618,8.741,12.336,8.741
           c5.309,0,9.532-2.503,11.097-7.5c0.93-2.496,1.24-5.464,1.24-10.307c0-5.153-0.31-7.959-1.24-10.462
           c-1.728-5.315-5.936-7.346-11.097-7.346c-5.774,0-9.206,2.975-10.771,6.091c-0.466,1.1-0.945,1.565-2.03,1.565h-16.715
           c-0.938,0-1.565-0.627-1.565-1.565v-58.413c0-0.93,0.627-1.558,1.565-1.558h59.351c0.937,0,1.565,0.627,1.565,1.558v15.467
           c0,0.93-0.628,1.558-1.565,1.558h-40.768c-0.62,0-0.93,0.317-0.93,0.938v20.937h0.465c2.658-2.348,7.967-5.005,15.933-5.005
           c13.592,0,23.426,6.09,27.331,17.962c1.402,4.37,2.192,9.213,2.192,18.117c0,6.711-0.944,12.182-2.355,16.56
           c-4.208,12.964-16.235,19.831-31.392,19.831c-18.11,0-30.764-9.524-32.64-23.426C148.606,227.537,149.072,226.754,150.009,226.6z
           M216.67,348.431c-4.554,14.318-16.785,21.473-32.28,21.473c-15.488,0-27.719-7.155-32.273-21.473
           c-1.953-6.112-2.475-11.06-2.475-24.208c0-13.148,0.522-18.096,2.475-24.216c4.554-14.311,16.785-21.473,32.273-21.473
           c15.495,0,27.726,7.162,32.28,21.473c1.953,6.119,2.474,11.068,2.474,24.216C219.144,337.37,218.623,342.319,216.67,348.431z
           M292.933,295.2c0,0.782-0.522,1.304-1.297,1.304h-38.138c-0.521,0-0.782,0.26-0.782,0.782v18.611
           c0,0.521,0.261,0.775,0.782,0.775h31.758c0.776,0,1.297,0.522,1.297,1.297v13.803c0,0.782-0.521,1.304-1.297,1.304h-31.758
           c-0.521,0-0.782,0.254-0.782,0.775v33.316c0,0.782-0.521,1.304-1.297,1.304h-16.531c-0.782,0-1.304-0.522-1.304-1.304v-85.9
           c0-0.775,0.522-1.297,1.304-1.297h56.749c0.776,0,1.297,0.522,1.297,1.297V295.2z
           M295.64,230.032c-4.371,13.592-15.312,21.713-32.019,21.713c-16.708,0-27.641-8.121-32.02-21.713
           c-1.551-4.681-2.34-9.531-2.34-33.105c0-23.588,0.79-28.431,2.34-33.119c4.378-13.584,15.312-21.706,32.02-21.706
           c16.707,0,27.648,8.121,32.019,21.706c1.565,4.688,2.34,9.531,2.34,33.119C297.98,220.501,297.205,225.352,295.64,230.032z
           M360.334,181.003h2.474c1.361,0,2.623,0.698,3.37,1.84c0.733,1.149,0.832,2.594,0.268,3.821l-29.256,63.63
           c-0.649,1.417-2.066,2.32-3.624,2.32H331.1c-1.361,0-2.629-0.691-3.37-1.84c-0.732-1.142-0.824-2.587-0.275-3.814
           l29.256-63.63C357.367,181.912,358.776,181.003,360.334,181.003z
           M309.852,197.302c1.72-5.041,6.563-8.284,13.027-8.284c6.472,0,11.322,3.243,13.035,8.284
           c0.705,2.03,0.917,0.62,0.917,6.986c0,6.359-0.212,4.956-0.917,6.972c-1.713,5.055-6.563,8.29-13.035,8.29
           c-6.464,0-11.308-3.236-13.027-8.29c-0.705-2.016-0.91-0.614-0.91-6.972C308.943,197.922,309.147,199.332,309.852,197.302z
           M368.117,295.2c0,0.782-0.521,1.304-1.296,1.304h-38.138c-0.522,0-0.782,0.26-0.782,0.782v18.611
           c0,0.521,0.26,0.775,0.782,0.775h31.758c0.775,0,1.297,0.522,1.297,1.297v13.803c0,0.782-0.522,1.304-1.297,1.304h-31.758
           c-0.522,0-0.782,0.254-0.782,0.775v33.316c0,0.782-0.515,1.304-1.298,1.304H310.07c-0.782,0-1.304-0.522-1.304-1.304v-85.9
           c0-0.775,0.521-1.297,1.304-1.297h56.75c0.775,0,1.296,0.522,1.296,1.297V295.2z
           M384.05,236.3c-1.713,5.055-6.571,8.297-13.035,8.297c-6.472,0-11.315-3.242-13.035-8.297
           c-0.698-2.009-0.909-0.606-0.909-6.972c0-6.365,0.211-4.949,0.909-6.979c1.72-5.04,6.563-8.276,13.035-8.276
           c6.464,0,11.322,3.236,13.035,8.276c0.704,2.03,0.91,0.614,0.91,6.979C384.959,235.693,384.754,234.291,384.05,236.3z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M319.348,209.244c0.508,1.515,1.818,2.319,3.532,2.319c1.727,0,3.032-0.804,3.539-2.319
           c0.31-0.811,0.402,1.198,0.402-4.956c0-6.168-0.092-4.159-0.402-4.956c-0.508-1.523-1.812-2.333-3.539-2.333
           c-1.713,0-3.024,0.81-3.532,2.333c-0.303,0.797-0.402-1.213-0.402,4.956C318.946,210.442,319.045,208.433,319.348,209.244z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M374.547,224.378c-0.501-1.53-1.812-2.333-3.532-2.333c-1.72,0-3.031,0.803-3.538,2.333
           c-0.303,0.804-0.395-1.219-0.395,4.949c0,6.162,0.092,4.152,0.395,4.963c0.507,1.509,1.818,2.319,3.538,2.319
           c1.72,0,3.031-0.81,3.532-2.319c0.31-0.811,0.408,1.198,0.408-4.963C374.955,223.159,374.856,225.183,374.547,224.378z"
                      fill="#000000"
                    />
                  </g>
                </g>
              </svg>

              Deals
            </a>
            </li>
            <li><a href="#contact">
              <i>
                <svg
                  width="20"
                  height="20"
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 33.834 33.834"
                  xmlSpace="preserve">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <g>
                    <path d="M32.253,29.334v4.5H1.581v-4.501c0-2.125,1.832-4.741,4.07-5.804l4.98-2.366l3.457,7.204l1.77-4.799 c0.349,0.066,0.695,0.154,1.059,0.154s0.709-0.088,1.059-0.154l1.68,4.563l3.389-7.048l5.141,2.445 C30.421,24.591,32.253,27.207,32.253,29.334z M6.105,13.562v-3.25c0-0.551,0.287-1.034,0.72-1.312c0.581-5.058,4.883-9,10.094-9 s9.514,3.942,10.096,9c0.432,0.278,0.719,0.761,0.719,1.312v3.25c0,0.863-0.699,1.563-1.563,1.563s-1.563-0.7-1.563-1.563v-0.683 c-0.846,4.255-3.961,8.205-7.688,8.205c-3.727,0-6.842-3.95-7.688-8.205v0.683c0,0.7-0.465,1.286-1.1,1.485 c0.622,2.117,2.002,3.946,3.908,5.146c0.352-0.116,0.796-0.094,1.227,0.13c0.692,0.36,1.045,1.06,0.783,1.56 c-0.261,0.5-1.033,0.612-1.729,0.251c-0.508-0.265-0.83-0.71-0.864-1.126c-2.183-1.396-3.731-3.533-4.37-5.998 C6.513,14.78,6.105,14.22,6.105,13.562z M7.89,8.635c0.047,0.003,0.092,0.004,0.137,0.021C8.14,8.698,8.222,8.779,8.279,8.874 c0.339,0.144,0.609,0.407,0.775,0.733C9.515,5.286,12.855,3,16.917,3c4.062,0,7.402,2.286,7.863,6.607 c0.229-0.449,0.664-0.77,1.185-0.837c-0.676-4.393-4.47-7.771-9.048-7.771C12.386,1,8.622,4.309,7.89,8.635z"></path>
                  </g>
                  </g>
                </svg>
              </i>
              Contact</a></li>
          </ul>
        </nav>
        <div className="header-buttons">
          <a href="/home" className="btn-cart">
            <i>

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
              </svg>
            </i>
            <span>
              {cartProducts.length}
            </span>
            Checkout
          </a>
          <a href="/home" className="btn-user">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                className="bi bi-person-fill"
                viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </i>
            Login
          </a>
        </div>
      </header>
      <section className="hero">
        <div className="background_image">
          <img src="images/random/home1-banner3.jpg" alt="" />
        </div>
        <div className="hero-content">
          <h1>Experience <span>Shopping</span> in 3D</h1>
          <p>Discover our latest collection with immersive 3D experiences</p>
          <button className="btn-primary">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
              </svg>
            </i>

            Shop Now</button>
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
          {randomProduct.length > 0 ? (
            randomProduct.map((item) => (
              <div key={item.id} className="product_container">
                <div>
                  <img src={item.image_url} alt={item.title} />
                </div>
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
                    Add
                  </button>
                  <button title="checkout"
                    onClick={() => confirmOrder()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    Buy
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
            </>
          )}
        </div>
      </section >

      <section id="collections" className="collections">
        <div className="collection-info">
          <h2>New Season Collection</h2>
          <p>Explore our latest arrivals with exclusive deals</p>
          <p>Check out our Blog page for more Information</p>
          <button className="btn-secondary">Blog</button>
        </div>
        {/* <div id="collection-model-container" className="model-container">
          <div className="card-stack">
            <h2>Furniture</h2>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/7.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Leather Backpack</h3>
                <p>Stylish and durable with modern compartments</p>
                <span>$89.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/33.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Minimalist Sneakers</h3>
                <p>Comfort-first casual wear with breathable fabric</p>
                <span>$69.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/10.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Urban Windbreaker</h3>
                <p>Lightweight outerwear for all seasons</p>
                <span>$120.00</span>
              </div>
            </div>
          </div>
          <div className="card-stack">
            <h2>Furniture</h2>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/7.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Leather Backpack</h3>
                <p>Stylish and durable with modern compartments</p>
                <span>$89.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/33.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Minimalist Sneakers</h3>
                <p>Comfort-first casual wear with breathable fabric</p>
                <span>$69.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/10.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Urban Windbreaker</h3>
                <p>Lightweight outerwear for all seasons</p>
                <span>$120.00</span>
              </div>
            </div>
          </div>
          <div className="card-stack">
            <h2>Furniture</h2>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/7.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Leather Backpack</h3>
                <p>Stylish and durable with modern compartments</p>
                <span>$89.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/33.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Minimalist Sneakers</h3>
                <p>Comfort-first casual wear with breathable fabric</p>
                <span>$69.99</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/images/checkout/10.jpg" alt="Barista Pro Espresso Machine" />
              </div>
              <div className="product-info">
                <h3>Urban Windbreaker</h3>
                <p>Lightweight outerwear for all seasons</p>
                <span>$120.00</span>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      <section id="deals" className="deals">
        <h2>Limited Time Offers</h2>
        <div className="deals-grid">
          {dealsProduct.length > 0 ? (
            dealsProduct.map((item) => (
              <div key={item.id} className="product_container">
                <div >
                  <img src={item.image_url} alt="" />
                </div>
                <div className="information">
                  <div> {item.title}</div>
                </div>
                <nav>
                  <button className="price">
                    {/* strike through */}
                    <span className="old-price">{`$${item.price.toFixed(2)}`}</span>
                    <span className="discount">{item.discount}%</span>
                    <span className="new-price">
                      ${(
                        item.discount !== undefined
                          ? (item.price - (item.price * item.discount) / 100).toFixed(2)
                          : 0
                      )}
                    </span>
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
                    Add
                  </button>
                  <button title="checkout"
                    onClick={() => confirmOrder()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    Buy
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
                  <button title="checkout" onClick={() => confirmOrder()}>
                    More
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