import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";

const DetailProduct = () => {

    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState("");
    const [productnum, setProductnum] = useState(0)
    const [price, setPrice] = useState(0)

    const getProduct = id => {
        ProductService.get(id)
            .then(response => {
                setCurrentProduct(response.data);
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

    // const quantityMinus = () => {
    //     if (productnum > 1) {
    //         setProductnum(productnum - 1);
    //     }
    // };
    
    // const quantityPlus = () => {
    //     setProductnum(productnum + 1);
    // }

    const modifynum = (num) => {
        if(num === 'plus') {
            setProductnum(productnum + 1)
            setPrice(price + currentProduct.productprice)
        } else if (num === 'minus' && productnum > 0) {
            setProductnum(productnum - 1)
            setPrice(price - currentProduct.productprice)
        }
    }

    return (
        <div>
            <div className="">
                <Link to={"/product"}>목록으로</Link>
                <div>{currentProduct.productname}</div>
                <div>{currentProduct.productdes}</div>
                <div>{currentProduct.productprice}</div>
                <div><img src={currentProduct.productimg} alt="img2"/></div>
                <button onClick={() => modifynum('minus')} className="minus"> - </button>
                <div className="calculator">{productnum}</div>
                <button onClick={() => modifynum('plus')} className="plus"> + </button>
                <div>{price}</div>

                <Link to="/orders" state={{id: id, name: currentProduct.productname, count: productnum, price: price}}>주문하기</Link>
            </div>
        </div>
    );
}

export default DetailProduct