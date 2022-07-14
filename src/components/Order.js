import React from "react";
import { Link } from "react-router-dom";

const Order = () => {
    return(
        <div>
            <div>주문완료!</div>
            <Link to={"/product"}>상품목록으로 돌아가기</Link>
        </div>
    )
}

export default Order