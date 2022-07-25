import { useEffect, useState } from "react";
import axios from "axios";

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
                        {order.productid},{order.productcount}
                        {order.phone},{order.productprice}
                        <div className="list-box-price">{order.productprice}</div>
                    </div> 
            ))}
        </div>
    )
}

export default MypageOne