import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductSerivce"
import { Link } from "react-router-dom"

const ProductList = () => {
    const [product, setProduct] = useState([])
    const [currentproduct, setCurrentProduct] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        retrieveProduct();
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName);
    }

    const retrieveProduct = () => {
        ProductService.getAll()
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    // const refreshList = () => {
    //     retrieveProduct();
    //     setCurrentProduct(null);
    //     setCurrentIndex(-1);
    // }

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    }

    const findByName = () => {
        ProductService.findByName(searchName)
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="상품명을 입력하세요"
                  value={searchName}
                  onChange={onChangeSearchName} />
                <div className="search-buttonbox">
                    <button
                      className="btn"
                      type="button"
                      onClick={findByName}
                    >
                        검색
                    </button>
                </div>
            </div>
            <div className="List">
                <h5>상품 목록</h5>
                <ul className="list-group">
                    {product &&
                      product.map((product, index) => (
                        <li className={"list-group-item" + (index === currentIndex ? "active" : "")}
                        onClick={() => setActiveProduct(product, index)}
                        >
                            {product.productname}
                            {/* <img src="`http://localhost:8081/{product.productimg}`"/> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductList;