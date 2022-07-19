import React, { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import OrderService from "../services/orders.service";
import { Modal, Button } from "antd";
import DaumPostCode from "react-daum-postcode"
import 'antd/dist/antd.css';

const Order = () => {

    const getCurrentUser = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();
    const { id, name } = location.state

    const [orders, setOrders] = useState({
        userid: getCurrentUser.userid,
        productid: id,
    })

    const onChangeValue = e => {
        const { name, value } = e.target
        setOrders({...orders, [name]: value})
    }

    const saveOrders = () => {
        var data = {
            userid: orders.userid,
            productid: orders.productid,
            address: orders.address,
            phone: orders.phone

        }

        OrderService.create(data)
            .then(response => {
                setOrders({
                    address: response.data.address,
                    phone: response.data.phone
                })
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const [mycode, setMycode] = useState("")
    const [myaddress, setMyaddress] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    const handleComplete = (data) => {
        // let fullAddress = data.address;
        // let extraAddress = "";
        // if (data.addressType === "R") {
        //     if(data.bname !== "") {
        //         extraAddress += data.bname
        //     }
        //     if(data.bulidingName !== "") {
        //         extraAddress += (extraAddress !== "" ? `, ${data.bulidingName}` : data.bulidingName)
        //     }
        //     fullAddress += (extraAddress !== "" ? `(${extraAddress})` : "")
        // }
        setMycode(data.zonecode);
        setMyaddress(data.address)
        console.log(data.zonecode, data.address)
        setIsOpen((prev) => !prev)
    }

    function onToggle() {
        setIsOpen((prev) => !prev)
    }


    return(
        <div>
            <label>주소</label>
            <input type="text" name="address" value={orders.address || ""} onChange={onChangeValue} />
            <Button type="primary" onClick={onToggle}>주소 검색</Button>
            {isOpen && (
                <Modal title="Basic Modal" visible={true} onCancel={onToggle}>
                <DaumPostCode onComplete={handleComplete} />
              </Modal>
            )}
            <label>연락처</label>
            <input type="text" name="phone" value={orders.phone || ""} onChange={onChangeValue} />
            <div>상품 이름 : {name}</div>
            <button onClick={saveOrders}>주문 ㄲ</button>
            <Link to={"/product"}>상품목록으로 돌아가기</Link>
        </div>
    )
}

export default Order