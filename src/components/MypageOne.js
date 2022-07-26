import { useEffect, useState } from "react";
import axios from "axios";

import "./css/mypage.css"

const MypageOne = () => {
    const [orders, setOrders] = useState([])
    
    const getCurrentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        findorder()
    }, [])

    const findorder = () => {
        axios.get("http://localhost:8080/api/orderinfo", {params : getCurrentUser})
        .then(response => {
            setOrders(response.data)
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <div>
            {orders &&
                orders.map((order, index) => (
                    <div className="list-box-item" key={index}>
                        <div className="box-item">상품 번호 : {order.productid}</div>
                        <div className="box-item">주문수량 : {order.productcount} </div>
                        <div className="box-item">총금액 : {order.productprice}</div>
                        <div className="box-item">핸드폰 : {order.phone}</div>
                        <div className="box-item">주소 : {order.address}</div>
                        <div className="box-item">주문날짜 : {order.orderdate.slice(0,10)}</div>
                    </div> 
            ))}
        </div>
    )
}

export default MypageOne