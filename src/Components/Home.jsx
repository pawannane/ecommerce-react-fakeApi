import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Navbar from "./Navbar";
import Products from "./Products";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  // state of products
  const [products, setProducts] = useState([])

  // state
  const [listedProducts, setListedProducts] = useState()

  // sorting state
  const [sort, setSort] = useState('asc')

  // active class state
  const [active, setActive] = useState('')

  // category state
  const [category, setCategory] = useState('')

  // getting products 
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        setProducts(json)
        setListedProducts(json)
      })

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, [sort]);

  // categories list rendering using span tag
  const [spans] = useState([
    { id: 'electronics', text: 'Electronics', class: 'electronics' },
    { id: 'jewelery', text: 'Jewelery', class: 'jewelery' },
    { id: `men's clothing`, text: `Men's Clothing`, class: 'mens-clothing' },
    { id: `women's clothing`, text: `Women's Clothing`, class: 'womens-clothing' }
  ])

  // handle sorting
  const handleSort = (e) => {
    // e.preventDefault();
    let sortVal = e.target.value;
    // console.log(e)
    setSort(sortVal)

  }

  // handle change filter category
  const handleChange = async (individualSpan) => {
    setActive(individualSpan.class);
    setCategory(individualSpan.text);
    await filterFunction(individualSpan.id)
  }

  // filter function
  const filterFunction = async (text) => {
    // console.log(text)
    await fetch(`https://fakestoreapi.com/products/category/${text}`)
      .then(res => res.json())
      .then(json => {
        setListedProducts(json)
      })
  }

  const handleSearch = (text) => {
    // console.log(text)
    let searchData = products.filter(
      product => {
        return (
          product.title.toLowerCase()
            .includes(text.toLowerCase())
        );
      }
    );
    setListedProducts(searchData)
  }


  return (
    <>
      {isLoading ? (
        <div className="loader">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      ) : (
        <div>
          <Navbar handleSearch={handleSearch} />
          <br />
          <div className="container-fluid filter-products-main-box">
            <div className="sorting-filter-section">
              <div className="filter-box">
                <h6>Sorting</h6>
                <select name="sorting" id="sorting" onChange={handleSort}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className="filter-box">
                <h6>Filter by category</h6>
                {spans.map((individualSpan, index) => (
                  <span key={index} id={individualSpan.id} className={individualSpan.class === active ? active : 'deactive'} onClick={() => handleChange(individualSpan)}>{individualSpan.text}</span>
                ))}
              </div>
            </div>

            {listedProducts.length > 0 && (
              <div className="my-products">
                <h1 className="text-center">{category}</h1>
                <div className="products-box">
                  <Products products={listedProducts} />
                </div>
              </div>
            )}
            {listedProducts.length < 1 && (
              <>
                {listedProducts.length > 0 && (
                  <div className="my-products">
                    <h1 className="text-center">All Products</h1>
                    <div className="products-box">
                      <Products products={listedProducts} />
                      <ToastContainer />
                    </div>
                  </div>
                )}
                {listedProducts < 1 && (
                  <div className="my-products please-wait">
                    Please wait ...
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
