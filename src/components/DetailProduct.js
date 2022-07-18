import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
import OrderService from "../services/orders.service";
import { useNavigate } from 'react-router-dom';


const DetailProduct = () => {
    let navigate = useNavigate(); 

    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState("");

    const [orders, setOrders] = useState({})

    useEffect(() => {
        const getCurrentUser = JSON.parse(localStorage.getItem("user"));
        if (getCurrentUser) {
          setOrders({userid: getCurrentUser.userid,
          productid: id})
        }
    }, [id]);

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

    const saveOrders = () => {
        var data = {
            userid: orders.userid,
            productid: orders.productid,
        }

        OrderService.create(data)
            .then(response => {
                navigate("/orders");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <div className="">
                <Link to={"/product"}>목록으로</Link>
                <div>{currentProduct.productname}</div>
                <div>{currentProduct.productdes}</div>
                <div><img src={currentProduct.productimg} alt="img2"/></div>
                <button onClick={saveOrders}>주문하기</button>
            </div>
        </div>
    );
}

export default DetailProduct