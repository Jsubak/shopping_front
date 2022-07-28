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
                    <div className="order-list-box-item" key={index}>
                        <div className="box-item"><span>상품 번호</span> <span>{order.productid}</span></div>
                        <div className="box-item"><span>주문수량</span> <span>{order.productcount}</span></div>
                        <div className="box-item"><span>총금액</span> <span>{order.productprice}</span></div>
                        <div className="box-item"><span>핸드폰</span> <span>{order.phone}</span></div>
                        <div className="box-item"><span>주소</span> <span>[{order.address.slice(0,5)}] {order.address.slice(5)}</span></div>
                        <div className="box-item"><span>주문날짜</span> <span>{order.orderdate.slice(0,10)}</span></div>
                    </div> 
            ))}
        </div>
    )
}

export default MypageOne