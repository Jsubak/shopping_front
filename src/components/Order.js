import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OrderService from "../services/orders.service";
import {useDaumPostcodePopup} from "react-daum-postcode"
import { useNavigate } from 'react-router-dom';
import ProductService from "../services/ProductService";
import "./css/orders.css"

const Order = () => {

    let navigate = useNavigate()

    const getCurrentUser = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();
    const { id, name, count, price } = location.state

    const [orders, setOrders] = useState({
        userid: getCurrentUser.userid,
        productid: id,
        productcount: count,
        productprice : price
    })

    const onChangeValue = e => {
        const { name, value } = e.target
        setOrders({...orders, [name]: value})
    }

    const saveOrders = () => {
        var data = {
            userid: orders.userid,
            productid: orders.productid,
            address: zone + address2 + orders.address,
            phone: orders.phone,
            productcount: orders.productcount,
            productprice : orders.productprice
        }

        OrderService.create(data)
            .then(response => {
                setOrders({
                    address: zone + address2 + response.data.address,
                    phone: response.data.phone
                })

                ProductService.buy(orders)
                .then(response => {
                    console.log(response.data);
                    alert("주문 성공")
                    navigate("/product")
                })
                .catch(e => {
                    console.log(e);
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    const open = useDaumPostcodePopup(scriptUrl);
    const [zone, setZone] = useState("")
    const [address2, setAddress2] = useState("")

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let zone = data.zonecode
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setZone(zone)
        setAddress2(fullAddress)
    };
    
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return(
        <div className="orderbox">
            <div className="ordercontainer">
                <div className="addressbox">
                    <label>주소</label>
                    <input disabled type="text" name= "zone" value={zone || ""} onChange={onChangeValue} />
                    <button onClick={handleClick}>주소 검색</button>
                    <div className="address-detail">
                        <input disabled type="text" name="address2" value={address2 || ""} onChange={onChangeValue} />
                    </div>
                    <div className="address-detail2">
                        <input type="text" name="address" value={orders.address || ""} onChange={onChangeValue} />
                    </div>
                </div>
                <div className="phonebox">
                    <label>연락처</label>
                    <input type="text" name="phone" value={orders.phone || ""} onChange={onChangeValue} />
                </div>

                <div>주문자 : {getCurrentUser.username}</div>
                <div>상품 이름 : {name}</div>
                <div>수량 : {count}</div>
                <div>금액 : {price}</div>
                <button onClick={saveOrders}>주문하기</button>

                <Link to={"/product"}>상품목록으로 돌아가기</Link>
            </div>
        </div>
    )
}

export default Order