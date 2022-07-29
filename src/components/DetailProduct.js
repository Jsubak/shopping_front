import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
import './css/productdetail.css'

const DetailProduct = () => {

    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState(undefined);
    const [productnum, setProductnum] = useState(1)
    const [price, setPrice] = useState(0)


    const getProduct = id => {
        ProductService.get(id)
            .then(response => {
                setCurrentProduct(response.data);
                setPrice(response.data.productprice);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getProduct(id);
    }, [id]);

    const modifynum = (num) => {
        if(num === 'plus' && productnum < currentProduct.productcount) {
            setProductnum(productnum + 1)
            setPrice(price + currentProduct.productprice)
        } else if (num === 'minus' && productnum > 1) {
            setProductnum(productnum - 1)
            setPrice(price - currentProduct.productprice)
        }
    }

    return (
        <div>
            {currentProduct &&
                <div className="detail-box">
                    <Link className="detail-arrow" to={"/product"}><img src={'../images/left-arrow.png'} alt="left-arrow" /></Link>
                    <div className="detail-box-container">
                        <div><img src={currentProduct.productimg} alt="img2"/></div>
                        <div className="productbox">
                            <div className="productname">{currentProduct.productname}</div>
                            <div className="productdes">{currentProduct.productdes}</div>
                            <div className="productprice">{currentProduct.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span>원</span></div>
                            <div className="productcount"><span>남은 수량 : </span>{currentProduct.productcount}</div>
                            <div>
                                {currentProduct.productcount === 0 ? (
                                    <div className="productsoldout">품절입니다.</div>
                                ) : (
                                <div>
                                    <div className="sumbox">
                                        <button className="productcount-button" onClick={() => modifynum('minus')}> - </button>
                                        <div className="calculator">{productnum}</div>
                                        <button className="productcount-button" onClick={() => modifynum('plus')}> + </button>
                                    </div>
                                    <div className="productsum"><span>총 금액</span> {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span>원</span></div>
                                    <Link className="ordersbtn" to="/orders" state={{id: id, name: currentProduct.productname, count: productnum, price: price}}>주문하기</Link>
                                </div>
                                )}
                            </div>
                        </div>
                    </div> 
                </div>
            }

            <footer></footer>
        </div>
    );
}

export default DetailProduct