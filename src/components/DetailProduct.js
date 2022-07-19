import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";

const DetailProduct = () => {

    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState("");

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

    return (
        <div>
            <div className="">
                <Link to={"/product"}>목록으로</Link>
                <div>{currentProduct.productname}</div>
                <div>{currentProduct.productdes}</div>
                <div><img src={currentProduct.productimg} alt="img2"/></div>
                <Link to="/orders" state={{id: id, name: currentProduct.productname}}>주문하기</Link>
            </div>
        </div>
    );
}

export default DetailProduct