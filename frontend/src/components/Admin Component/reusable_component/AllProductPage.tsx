import { JSX, useCallback, useEffect, useState } from "react";
import "../../../../styles/allAdminProducts.css"
import { deleteProducts, fetchAdminAllProducts } from "@/services/api";
import { CategoryProduct, Product } from "@/services/dataTypes";

export default function AllProductComponent(): JSX.Element {
  const [allProducts, setAllProducts] = useState<CategoryProduct<Product>[]>([]);
  const [activeProductButton, setActiveProductButton] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const displayProductCategory = useCallback((index: number, category: string) => {
    setCategoryIndex(index); // Update the index for highlighting
    setActiveProductButton(category);
    // Use the passed index to get the correct category
    setProducts(allProducts[index]?.product_details || []);
  }, [allProducts]); // Include allProducts to reflect latest data

  const deleteProduct = useCallback(async (id: number, index: number) => {
    try {
      const response = await deleteProducts({ id })
      const { result } = response.data;
      if (result) {
        if (index == 0) {
          const newArray = [...products.slice(index + 1, products.length)]
          setProducts(newArray)
        }
        const newArray = [...products.slice(0, index), ...products.slice(index + 1, products.length)]
        setProducts(newArray)
      }
      console.log("🚀 ~ deleteProduct ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ deleteProduct ~ error:", error)
    }
  }, [products])

  function showNotUploadedProduct() {
    const filteredProducts = allProducts[categoryIndex]?.product_details.filter(item => !item.uploaded) || [];
    setProducts(filteredProducts);
  }

  function showUploadedProduct() {
    const filteredProducts = allProducts[categoryIndex]?.product_details.filter(item => item.uploaded) || [];
    setProducts(filteredProducts);
  }

  useEffect(() => {
    // 2. Define and call async fetch inside useEffect
    async function loadProducts() {
      try {
        const response = await fetchAdminAllProducts();   // wait for Axios
        console.log('Fetched products:', response.data);  // DevTools console
        const { result, data } = response.data;
        if (result) {
          setAllProducts(
            Object.entries(data).map(([category, products]) => ({
              category,
              product_details: products as Product[],
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="Admin_All_product">
      <div className="clothes_type_grouping">
        <div>
          <input type="text" placeholder="Search for product" />
        </div>
        {allProducts !== undefined &&
          allProducts.map((item, index) => (
            <fieldset key={index}>
              {/* <legend className="clothes_categories">
                </legend> */}
              <button
                id={activeProductButton === item.category ? 'activate_header_btn' : ''}
                className="clothes_grouping_button"
                onClick={() => displayProductCategory(index, item.category)}
              >
                {item.category}
                <i className="dropdown_widget_icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </i>
              </button>
            </fieldset>
          ))
        }
      </div>
      <div className="available_items_container">
        <div className="navigation_option">
          <h2>
            All Product
          </h2>
          <nav>
            <input type="date" name="" id="" title="search date" />
            <input type="time" name="" id="" title="search time" />
            <button
              title="delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Delete
            </button>
            <button
              title="delete"
              onClick={() => showNotUploadedProduct()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Don't Upload
            </button>
            <button
              title="delete"
              onClick={() => showUploadedProduct()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Upload
            </button>
            <button
              title="delete"
            // onClick={() => addProduct(item)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Add
            </button>
            <button title="edit"
            // onClick={() => confirmOrder()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
              </svg>
              Edit
            </button>
          </nav>
        </div>
        <div className="navigation_option_content">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={item.id} className="product_container">
                <div>
                  <img src={item.image_url} alt="" />
                </div>
                <div className="information">
                  {item.title}
                </div>
                <nav>
                  <button className="price">
                    {`$${item.price}`}
                  </button>
                  <button
                    // onClick={() => showProductDetails()}
                    title={item.title}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                    </svg>
                    More
                  </button>
                  <button
                    title="delete"
                    onClick={() => deleteProduct(item.id, index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                    Delete
                  </button>
                  <button title="edit"
                  // onClick={() => confirmOrder()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    Edit
                  </button>
                  <button
                    // onClick={() => addToWishlist(item.id)}
                    title="add to wishlist"  >

                    <svg className="wishlist_svg" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M294.957,478.609c-27.619,0-50.087-22.468-50.087-50.087c0-9.223-7.479-16.696-16.696-16.696H16.696 C7.479,411.826,0,419.299,0,428.522C0,474.554,37.446,512,83.478,512h211.478c9.217,0,16.696-7.473,16.696-16.696 C311.652,486.082,304.174,478.609,294.957,478.609z"></path> </g> </g> <g> <g> <path d="M510.239,209.576l-33.391-66.783c-2.826-5.658-8.608-9.228-14.935-9.228s-12.109,3.571-14.935,9.228l-33.391,66.783 c-1.152,2.321-1.761,4.875-1.761,7.467v16.696H512v-16.696C512,214.451,511.391,211.897,510.239,209.576z"></path> </g> </g> <g> <g> <rect x="411.826" y="267.13" width="100.174" height="144.696"></rect> </g> </g> <g> <g> <path d="M411.826,445.217v16.696c0,27.619,22.468,50.087,50.087,50.087C489.532,512,512,489.532,512,461.913v-16.696H411.826z"></path> </g> </g> <g> <g> <path d="M428.522,0H150.261c-46.032,0-83.478,37.446-83.478,83.478v294.956h161.391c27.619,0,50.087,22.468,50.087,50.087 c0,9.206,7.49,16.696,16.696,16.696c27.569,0,49.99,22.39,50.072,49.94c20.239-15.246,33.406-39.401,33.406-66.636V100.174h116.87 c9.217,0,16.696-7.473,16.696-16.696C512,37.446,474.554,0,428.522,0z M150.261,333.913c-9.22,0-16.696-7.475-16.696-16.696 s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696S159.481,333.913,150.261,333.913z M150.261,267.13 c-9.22,0-16.696-7.475-16.696-16.696c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 C166.957,259.655,159.481,267.13,150.261,267.13z M150.261,200.348c-9.22,0-16.696-7.475-16.696-16.696 c0-9.22,7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696C166.957,192.873,159.481,200.348,150.261,200.348z M150.261,133.565c-9.22,0-16.696-7.475-16.696-16.696s7.475-16.696,16.696-16.696s16.696,7.475,16.696,16.696 S159.481,133.565,150.261,133.565z M294.957,333.913h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,326.44,304.174,333.913,294.957,333.913z M294.957,267.13h-77.913c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913 c9.217,0,16.696,7.473,16.696,16.696C311.652,259.657,304.174,267.13,294.957,267.13z M294.957,200.348h-77.913 c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696 C311.652,192.875,304.174,200.348,294.957,200.348z M294.957,133.565h-77.913c-9.217,0-16.696-7.473-16.696-16.696 c0-9.223,7.479-16.696,16.696-16.696h77.913c9.217,0,16.696,7.473,16.696,16.696C311.652,126.092,304.174,133.565,294.957,133.565 z M381.293,66.783c6.892-19.435,25.456-33.391,47.229-33.391c21.772,0,40.337,13.956,47.229,33.391H381.293z"></path> </g> </g> </g>
                    </svg>
                    Mark
                  </button>
                </nav>
              </div>)
            )) : (
            <div>No products found in </div>
          )}
        </div>
        <div className="more_items">
          <button className="next_page">Prev Items</button>
          <button className="prev_page">Next Items</button>
        </div>
      </div>
    </div>
  )
}