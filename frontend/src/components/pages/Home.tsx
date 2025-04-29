import { JSX, useCallback, useEffect, useState } from "react";
import '../../../styles/home.css';
import HomeAvailableProduct from "../Home Component/HomeProducts";
import HomeSignUp from "../Home Component/HomeSignUp";
import OrderSummary from "../Home Component/CheckoutPage";
import HomeBlogPage from "../Home Component/BlogHome";
import WishlistComponent from "../Home Component/WishListPage";
import OrderHistoryComponent from "../Home Component/HistoryPage";
import MyAccountComponent from "../Home Component/AccountDetails";

export default function ShoppingPageHome(): JSX.Element {
  const [showAdminOption, setShowAdminOption] = useState(false);
  const [showCheckoutSummary, setShowCheckoutSummary] = useState(false);

  const [activeButton, setActiveButton] = useState('Home');


  console.log("🚀 ~ ShoppingPageHome ~ showAdminOption:", showAdminOption)


  const handleClickedBtn = (buttonName: string) => {
    setActiveButton(buttonName);
    // Perform additional actions here
  };

  function handleAccountClick() {
    setShowAdminOption(prev => !prev);
  }



  function CheckoutSummaryClick() {
    setShowCheckoutSummary(prev => !prev)
  }

  const renderSideViewContent = useCallback(() => {
    switch (activeButton) {
      case "Home":
        return <HomeAvailableProduct />;
      case "Sign In":
      case "Sign Up":
        return <HomeSignUp />;
      case "Checkout":
        return <OrderSummary />;
      case "Blog":
        return <HomeBlogPage />;
      case "Wishlist":
        return <WishlistComponent />;
      case "History":
        return <OrderHistoryComponent />;
      case "My Account":
        return <MyAccountComponent />;
      default:
        return <HomeAvailableProduct />;
    }
  }, [activeButton]); // <-- correct placement :contentReference[oaicite:2]{index=2}

  useEffect(() => {
    // If you need to perform side-effects when activeButton changes,
    // you can still call the memoized function here:
    renderSideViewContent();
  }, [renderSideViewContent]);


  return (
    <>
      <div className="container">
        <div className="container_items">
          <div className="clothes_filter_option_widget">
            <h1 id="text3d">
              <span id="first_part" > E-commerce</span>
              <span id="second_part" > Project</span>
            </h1>
            <nav className="nav_bar">
              <button
                className={activeButton === 'Home' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('Home')}
              >
                Home
              </button>
              <button
                className={activeButton === 'Blog' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('Blog')}
              >
                Blog
              </button>
              <button
                className={activeButton === 'Contact Us' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('Contact Us')}
              >
                Contact Us
              </button>
              <button
                className={activeButton === 'History' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('History')}
              >
                History
              </button>
            </nav>
            <div className="search_widget">
              {/* search */}
              <div className="search_container">
                <input
                  type="text"
                  name="s"
                  value=""
                  placeholder="Search ..."
                  className="searchbar"
                />
                <i className="search_widget_icon search_svg_position">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
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
                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </i>
              </div>
              {/* account */}
              <div
                className="myAccount_title"
                onClick={() => handleAccountClick()}
              >
                <i className="profile_widget_icon"  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </i>
                <span>Account</span>
                <i className="dropdown_widget_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </i>
                {showAdminOption &&
                  <div className="position">
                    <div id="accountOptions" className="collapse">
                      <button
                        onClick={() => handleClickedBtn('My Account')}

                      >
                        <i >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          </svg>
                        </i>
                        My Account
                      </button>
                      <button
                        onClick={() => handleClickedBtn('Sign Up')}
                      >
                        <i className="fa fa-sign-in">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                          </svg>
                        </i>
                        Sign in
                      </button>
                      <button
                        onClick={() => handleClickedBtn('Sign Up')}
                      >
                        <i className="fa fa-user">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </i>
                        Register Account
                      </button>
                      <button
                        onClick={() => handleClickedBtn('Checkout')}
                      >
                        <i className="fa fa-check" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                          </svg>
                        </i>
                        Checkout
                      </button>
                      <button
                        onClick={() => handleClickedBtn('Wishlist')}
                        className="link_wishlist"
                      >
                        <i className="fa fa-heart">
                          <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M294.957,478.609c-27.619,0-50.087-22.468-50.087-50.087c0-9.223-7.479-16.696-16.696-16.696H16.696 C7.479,411.826,0,419.299,0,428.522C0,474.554,37.446,512,83.478,512h211.478c9.217,0,16.696-7.473,16.696-16.696 C311.652,486.082,304.174,478.609,294.957,478.609z"></path> </g> </g> <g> <g> <path d="M510.239,209.576l-33.391-66.783c-2.826-5.658-8.608-9.228-14.935-9.228s-12.109,3.571-14.935,9.228l-33.391,66.783 c-1.152,2.321-1.761,4.875-1.761,7.467v16.696H512v-16.696C512,214.451,511.391,211.897,510.239,209.576z"></path> </g> </g> <g> <g> <rect x="411.826" y="267.13" width="100.174" height="144.696"></rect> </g> </g> <g> <g> <path d="M411.826,445.217v16.696c0,27.619,22.468,50.087,50.087,50.087C489.532,512,512,489.532,512,461.913v-16.696H411.826z"></path> </g> </g> <g> <g> <path d="M428.522,0H150.261c-46.032,0-83.478,37.446-83.478,83.478v294.956h161.391c27.619,0,50.087,22.468,50.087,50.087 c0,9.206,7.49,16.696,16.696,16.696c27.569,0,49.99,22.39,50.072,49.94c20.239-15.246,33.406-39.401,33.406-66.636V100.174h116.87 c9.217,0,16.696-7.473,16.696-16.696C512,37.446,474.554,0,428.522,0z M150.261,333.913c-9.22,0-16.696-7.475-16.696-16.696 s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696S159.481,333.913,150.261,333.913z M150.261,267.13 c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 C166.957,259.655,159.481,267.13,150.261,267.13z M150.261,200.348c-9.22,0-16.696-7.475-16.696-16.696 c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696C166.957,192.873,159.481,200.348,150.261,200.348z M150.261,133.565c-9.22,0-16.696-7.475-16.696-16.696s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 S159.481,133.565,150.261,133.565z M294.957,333.913h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,326.44,304.174,333.913,294.957,333.913z M294.957,267.13h-77.913c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913 c9.217,0,16.696,7.473,16.696,16.696C311.652,259.657,304.174,267.13,294.957,267.13z M294.957,200.348h-77.913 c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696 C311.652,192.875,304.174,200.348,294.957,200.348z M294.957,133.565h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,126.092,304.174,133.565,294.957,133.565 z M381.293,66.783c6.892-19.435,25.456-33.391,47.229-33.391c21.772,0,40.337,13.956,47.229,33.391H381.293z"></path> </g> </g> </g></svg>
                        </i>
                        My Wishlists
                      </button>
                    </div>
                  </div>
                }
              </div>
              {/* userCart */}
              <div className="checkout_cart" onClick={() => CheckoutSummaryClick()} >
                <i className="shopping_cart_widget_icon ">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 287.755 287.755"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path d="M134.16,279.13c-15.24,0-26.715-12.31-26.715-27.544c0-15.162,11.475-26.638,26.715-26.638 c15.162,0,27.472,11.476,27.472,26.638C161.626,266.821,149.316,279.13,134.16,279.13z"></path>
                        <path d="M265.515,176.575c-1.682,7.085-2.275,19.503-6.762,25.244c-2.708,3.465-6.773,5.626-11.943,5.626H92.21 c-9.962,0-18.056-8.022-18.056-18.003c0-6.461-18.507-98.199-25.497-132.633c-1.453-7.146-8.551-12.995-15.834-13.061 l-14.711-0.141c-19.786,0-18.075-18.774-18.075-18.774c0.384-6.626,2.642-10.581,5.434-12.911 c5.597-4.668,18.231-3.008,25.347-3.02l12.874-0.024c22.146,0,30.883,12.661,34.317,22.929c2.312,6.917,3.495,18.735,5.05,25.857 l22.104,100.829c1.561,7.122,8.737,12.893,16.021,12.893H222.31c7.29,0,14.412-5.771,15.907-12.91l16.507-78.486 c2.132-9.217,5.566-13.627,9.086-15.501c6.425-3.444,19.882,1.63,22.416,8.455c3.759,10.157-0.595,27.37-0.595,27.37 S272.691,146.484,265.515,176.575z"></path>
                        <path d="M224.382,279.13c-15.18,0-26.649-12.31-26.649-27.544c0-15.162,11.47-26.638,26.649-26.638 c15.162,0,27.525,11.476,27.525,26.638C251.908,266.821,239.544,279.13,224.382,279.13z"></path>
                        <path d="M135.085,153.335c-4.984,0-9.025-4.053-9.025-9.043c0-4.978,4.042-9.031,9.025-9.031c4.996,0,9.031,4.053,9.031,9.031 C144.116,149.283,140.087,153.335,135.085,153.335z"></path>
                        <path d="M171.209,153.335c-4.983,0-9.024-4.053-9.024-9.043c0-4.978,4.041-9.031,9.024-9.031c4.979,0,9.031,4.053,9.031,9.031 C180.241,149.283,176.188,153.335,171.209,153.335z"></path>
                        <path d="M207.323,153.335c-4.99,0-9.031-4.053-9.031-9.043c0-4.978,4.041-9.031,9.031-9.031c4.978,0,9.025,4.053,9.025,9.031 C216.348,149.283,212.3,153.335,207.323,153.335z"></path>
                        <path d="M117.022,117.21c-4.972,0-9.037-4.035-9.037-9.021c0-4.981,4.065-9.035,9.037-9.035c5.008,0,9.043,4.053,9.043,9.035 C126.06,113.175,122.024,117.21,117.022,117.21z"></path>
                        <path d="M153.147,99.161c4.984,0,9.025,4.044,9.025,9.028c0,4.986-4.041,9.028-9.025,9.028c-4.989,0-9.031-4.042-9.031-9.028 C144.116,103.205,148.158,99.161,153.147,99.161z"></path>
                        <path d="M189.266,99.161c4.984,0,9.025,4.044,9.025,9.028c0,4.986-4.041,9.028-9.025,9.028c-4.99,0-9.031-4.042-9.031-9.028 C180.235,103.205,184.276,99.161,189.266,99.161z"></path>
                        <path d="M225.379,99.161c4.983,0,9.024,4.044,9.024,9.028c0,4.986-4.041,9.028-9.024,9.028c-4.99,0-9.031-4.042-9.031-9.028 C216.348,103.205,220.389,99.161,225.379,99.161z"></path>
                        <path d="M207.323,81.104c-4.99,0-9.031-4.053-9.031-9.022c0-4.993,4.041-9.031,9.031-9.031c4.978,0,9.025,4.032,9.025,9.031 C216.348,77.051,212.3,81.104,207.323,81.104z"></path>
                        <path d="M171.209,81.104c-4.983,0-9.024-4.053-9.024-9.022c0-4.993,4.041-9.031,9.024-9.031c4.979,0,9.031,4.032,9.031,9.031 C180.241,77.051,176.188,81.104,171.209,81.104z"></path>
                        <path d="M135.085,81.104c-4.984,0-9.025-4.053-9.025-9.022c0-4.993,4.042-9.031,9.025-9.031c4.996,0,9.031,4.032,9.031,9.031 C144.116,77.051,140.087,81.104,135.085,81.104z"></path>
                      </g>
                    </g>
                  </svg>
                </i>
                <span id="checkout_count">
                  5
                </span>
                {/* User cart dropdown content can be added here */}
                {showCheckoutSummary &&
                  <div className="position">
                    <div id="checkout_summary" className="dropdown-content">
                      <div className="checkout_images">
                        <div className="ordered_images" >
                          <img src="/images/profile/profile.png" alt="" />
                          <div className="count" >Qty: 4</div>
                        </div>
                        <div className="ordered_images" >
                          <img src="/images/profile/profile.png" alt="" />
                          <div className="count" >Qty: 4</div>
                        </div>
                        <div className="ordered_images" >
                          <img src="/images/profile/profile.png" alt="" />
                          <div className="count" >Qty: 4</div>
                        </div>
                        <div className="remaining_images" >
                          <img src="/images/profile/profile.png" alt="" />
                          <span>+5</span>
                        </div>
                      </div>
                      <div className="total_sum">
                        <span>total</span>
                        <span>1283</span>
                      </div>
                      <div className="option">
                        <button>
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                          </i>
                          View cart
                        </button>
                        <button>
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                            </svg>
                          </i>
                          checkout
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <main>
            {renderSideViewContent()}
          </main>
          {/* <div className="chatRoom">
            <div id="conversation_heading">
              <h1 className="name">
                Josephine Aguilar
              </h1>
            </div>
            <div id="conversation_room">
              <div className="inbox_message">
                <div className="message_received">Hey, did you catch yesterday’s debate?</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">I did—lots of fiery exchanges on healthcare policy.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">Right? The candidate’s plan to expand coverage seems ambitious.</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">Ambitious, yes—wondering how they’ll fund it without raising taxes too much.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">They mentioned closing corporate loopholes. Could work if enforced.</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">True, but lobbying groups will push back hard.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">That’s politics for you. What about foreign policy remarks?</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">I liked the emphasis on rebuilding alliances—much needed after recent tensions.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">Definitely. And the stance on climate agreements?</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">They want to rejoin the Paris Accord with stricter emissions targets.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">That’ll please environmental groups, but industry might lobby against.</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">Balance is tough. They proposed incentives for clean energy, though.</div>
              </div>
              <div className="inbox_message">
                <div className="message_received">Incentives could work if budgets are solid.</div>
              </div>
              <div className="outbox_message">
                <div className="message_sent">Agreed. Overall, the debate showed clear contrasts—makes Election Day closer.</div>
              </div>
            </div>
            <div id="text-box">
              <textarea
                className="text-input"
                placeholder="Reply message"
                rows={1}
              ></textarea>
              <i className="send-svg">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
              </i>
            </div>
          </div> */}
        </div>
        <div className="random_clothes">
          <div
            style={{ backgroundImage: `url("/images/random/home1-banner1.jpg")` }}
          >
          </div>
        </div>
      </div>

    </>
  )
}





