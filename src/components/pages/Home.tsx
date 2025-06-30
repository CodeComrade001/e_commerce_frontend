import { JSX, useCallback, useEffect, useRef, useState } from "react";
import '../../../styles/home.css';
import HomeAvailableProduct from "../Home Component/HomeProducts";
import HomeSignUp from "../Home Component/HomeSignUp";
import OrderSummary from "../Home Component/CheckoutPage";
import HomeBlogPage from "../Home Component/BlogHome";
import WishlistComponent from "../Home Component/WishListPage";
import OrderHistoryComponent from "../Home Component/HistoryPage";
import MyAccountComponent from "../Home Component/AccountDetails";
import { useAuth } from "@/context/AuthContext";
import { useProductContext } from "@/context/ProductContext";
import { fetchUserDetails } from "@/services/api";


export default function ShoppingPageHome(): JSX.Element {
  const { userId } = useAuth();   // ← grab userId from context
  const { cartProducts } = useProductContext()
  const [showAccountOption, setShowAccountOption] = useState(false);
  const [showCheckoutSummary, setShowCheckoutSummary] = useState(false);

  const [activeButton, setActiveButton] = useState('Home');
  const [userDetails, setUserDetails] = useState<{ name: string, email: string, avatar_url: string, address: string, phone: string } | null>(null)

  function changeActiveButton(buttonName: string) {
    setActiveButton(buttonName);
  }

  const handleClickedBtn = (buttonName: string) => {
    setActiveButton(buttonName);
    // Perform additional actions here
  };

  // Separate refs for each timer
  const accountTimerRef = useRef<number | null>(null);
  const checkoutTimerRef = useRef<number | null>(null);

  // Utility to clear a given timer ref
  const clearTimer = useCallback((ref: React.MutableRefObject<number | null>) => {
    if (ref.current !== null) {
      clearTimeout(ref.current);
      ref.current = null;
    }
  }, []);

  //
  // Account menu handlers
  //
  const onAccountEnter = () => {
    clearTimer(accountTimerRef);
    setShowAccountOption(true);
  };

  const onAccountLeave = () => {
    clearTimer(accountTimerRef);
    accountTimerRef.current = window.setTimeout(() => {
      setShowAccountOption(false);
      accountTimerRef.current = null;
    }, 1000);
  };

  //
  // Checkout summary handlers
  //
  const onCheckoutEnter = () => {
    clearTimer(checkoutTimerRef);
    setShowCheckoutSummary(true);
  };

  const onCheckoutLeave = () => {
    clearTimer(checkoutTimerRef);
    checkoutTimerRef.current = window.setTimeout(() => {
      setShowCheckoutSummary(false);
      checkoutTimerRef.current = null;
    }, 1000);
  };

  const renderSideViewContent = useCallback(() => {
    console.log(" user selected btn type is   ", activeButton)
    switch (activeButton) {
      case "Home":
        return <HomeAvailableProduct
          checkoutProps={changeActiveButton}
        />;
      case "Sign in":
        return (activeButton.trim() === "Sign in") && <HomeSignUp authType={activeButton} />;
      case "Sign up":
        return (activeButton.trim() === "Sign up") && <HomeSignUp authType={activeButton} />;
      case "Checkout":
        return <OrderSummary />;
      case "Blog":
        return <HomeBlogPage />;
      case "Wishlist":
        return <WishlistComponent
          checkoutProps={changeActiveButton}
        />;
      case "History":
        return <OrderHistoryComponent />;
      case "My Account":
        if (userDetails !== null) {
          const { name, email, avatar_url, address, phone } = userDetails;

          return <MyAccountComponent
            nameProp={name}
            emailProp={email}
            avatar_urlProp={avatar_url}
            addressProp={address}
            phoneProp={phone}
          />
        }
        return <HomeAvailableProduct
          checkoutProps={changeActiveButton}
        />;
        ;
      default:
        return <HomeAvailableProduct
          checkoutProps={changeActiveButton}
        />;
    }
  }, [activeButton]); // <-- correct placement :contentReference[oaicite:2]{index=2}


  useEffect(() => {
    // you can now fetch user‐specific data:
    if (userId) {
      // e.g. api.get(`/orders?userId=${userId}`)
      console.log("user id has been fetched", userId)
      async function fetchAllDetails(userId: number) {
        const response = await fetchUserDetails({ userId })
        const { result, user } = response.data;
        if (result) {
          setUserDetails(user)
        }
      }
      fetchAllDetails(userId)
    }
  }, [userId]);

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
                <i>
                  <svg
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                </i>
                Home
              </button>
              <button
                className={activeButton === 'Blog' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('Blog')}
              >
                <i>
                  <svg
                    width="20"
                    height="20"
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
                          d="M0,0.005v511.991h512v-18.07V0.005H0z M475.859,475.855H36.141V111.427h439.718V475.855z"
                          fill="#000000"
                        />
                        <rect
                          x="295.154"
                          y="309.893"
                          className="st0"
                          width="138.537"
                          height="118.967"
                          fill="#000000"
                        />
                        <rect
                          x="78.308"
                          y="311.693"
                          className="st0"
                          width="162.625"
                          height="18.071"
                          fill="#000000"
                        />
                        <rect
                          x="78.308"
                          y="408.99"
                          className="st0"
                          width="162.625"
                          height="18.07"
                          fill="#000000"
                        />
                        <rect
                          x="78.308"
                          y="360.346"
                          className="st0"
                          width="162.625"
                          height="18.07"
                          fill="#000000"
                        />
                        <path
                          className="st0"
                          d="M80.594,268.538h36.415c20.752,0,33.317-9.035,33.317-27.953c0-11.426-6.494-19.341-12.847-21.741v-0.283
           c6.353-3.529,11.153-10.023,11.153-20.461c0-15.256-9.742-25.552-30.627-25.552H80.594c-0.838,0-1.403,0.565-1.403,1.411v93.159
           C79.19,267.973,79.755,268.538,80.594,268.538z M99.944,190.185c0-0.556,0.264-0.846,0.847-0.846h14.682
           c7.897,0,12.555,4.094,12.555,11.144c0,7.067-4.658,11.302-12.555,11.302h-14.682c-0.583,0-0.847-0.282-0.847-0.846V190.185z
           M99.944,228.576c0-0.556,0.264-0.838,0.847-0.838h15.794c8.489,0,12.997,4.658,12.997,12.009c0,7.473-4.508,12-12.997,12h-15.794
           c-0.583,0-0.847-0.291-0.847-0.856V228.576z"
                          fill="#000000"
                        />
                        <path
                          className="st0"
                          d="M178.048,268.538h62.55c0.839,0,1.403-0.565,1.403-1.42v-15.662c0-0.857-0.564-1.412-1.403-1.412h-42.352
           c-0.574,0-0.848-0.282-0.848-0.856v-75.229c0-0.846-0.556-1.411-1.411-1.411h-17.939c-0.846,0-1.402,0.565-1.402,1.411v93.159
           C176.646,267.973,177.202,268.538,178.048,268.538z"
                          fill="#000000"
                        />
                        <path
                          className="st0"
                          d="M295.127,270.082c16.809,0,30.071-7.756,35.012-23.286c2.118-6.634,2.674-12,2.674-26.258
           c0-14.259-0.556-19.624-2.674-26.259c-4.94-15.52-18.202-23.285-35.012-23.285c-16.799,0-30.07,7.765-35.002,23.285
           c-2.126,6.635-2.691,12-2.691,26.259c0,14.258,0.565,19.624,2.691,26.258C265.057,262.327,278.328,270.082,295.127,270.082z
           M280.022,199.926c2.117-6.634,7.208-10.587,15.105-10.587c7.906,0,12.988,3.953,15.106,10.587
           c1.129,3.397,1.553,8.039,1.553,20.612c0,12.555-0.424,17.223-1.553,20.603c-2.118,6.644-7.2,10.606-15.106,10.606
           c-7.897,0-12.988-3.962-15.105-10.606c-1.121-3.38-1.553-8.048-1.553-20.603C278.469,207.965,278.901,203.323,280.022,199.926z"
                          fill="#000000"
                        />
                        <path
                          className="st0"
                          d="M395.424,270.082c16.932,0,30.203-8.603,35.012-24c1.685-5.214,2.383-13.12,2.383-21.59v-7.915
           c0-0.83-0.565-1.403-1.403-1.403h-33.026c-0.857,0-1.421,0.574-1.421,1.403v13.571c0,0.838,0.564,1.402,1.421,1.402h12.979
           c0.564,0,0.846,0.292,0.846,0.847c0,4.085-0.424,7.058-1.129,9.467c-1.976,6.345-8.188,9.883-15.388,9.883
           c-8.33,0-13.562-3.962-15.68-10.606c-1.12-3.38-1.544-8.048-1.544-20.603c0-12.574,0.424-17.082,1.544-20.47
           c2.118-6.636,7.209-10.729,15.406-10.729c7.897,0,12.688,3.388,16.509,9.882c0.282,0.706,0.988,0.988,1.985,0.706l15.097-6.352
           c0.839-0.424,0.998-1.27,0.565-2.126c-4.526-11.577-16.235-20.453-34.156-20.453c-17.091,0-30.361,7.765-35.302,23.285
           c-2.118,6.635-2.692,12-2.692,26.259c0,14.258,0.574,19.624,2.692,26.258C365.063,262.327,378.333,270.082,395.424,270.082z"
                          fill="#000000"
                        />
                      </g>
                    </g>
                  </svg>
                </i>
                Blog
              </button>
              <button
                className={activeButton === 'Contact Us' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('Contact Us')}
              >
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
                Contact Us
              </button>
              <button
                className={activeButton === 'History' ? 'activate_header_btn' : ''}
                onClick={() => handleClickedBtn('History')}
              >
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                </i>
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
                onMouseEnter={() => onAccountEnter()}
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
                {showAccountOption &&
                  <div className="position"
                    onMouseLeave={() => onAccountLeave()}
                  >
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
                        onClick={() => handleClickedBtn('Sign in')}
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
                        onClick={() => handleClickedBtn('Sign up')}
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
              <div className="checkout_cart"
                onMouseEnter={() => onCheckoutEnter()}
              >
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
                  {cartProducts.length}
                </span>
                {/* User cart dropdown content can be added here */}
                {showCheckoutSummary &&
                  <div
                    className="position"
                  >
                    <div
                      onMouseLeave={() => onCheckoutLeave()}
                      id="checkout_summary"
                      className="dropdown-content"
                    >
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

          <main className="page_component" >
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





