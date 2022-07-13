import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";


const DetailProduct = props => {
    const { id } = useParams();
    let navigate = useNavigate();

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
            {currentProduct ? (
                <div className="edit-form">
                    <Link to={"/product"}>목록으로</Link>
                    <div>{currentProduct.productname}</div>
                    <div>{currentProduct.productdes}</div>
                    <button>결제하기</button>
                </div>
            ) : (
                <div>
                    <br />
                    <p>????</p>
                </div>
            )}
        </div>
    );
}

export default DetailProduct