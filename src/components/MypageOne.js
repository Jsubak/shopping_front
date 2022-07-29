import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";
import "./css/mypage.css"


const MypageOne = () => {

    const [post, setPost] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchPost = async () => {
            const getCurrentUser = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get("http://localhost:8080/api/orderinfo", {params : getCurrentUser})
            setPost(res.data)
        }
        fetchPost()
    }, [])

    // const findorder = () => {
    //     axios.get("http://localhost:8080/api/orderinfo", {params : getCurrentUser})
    //     .then(response => {
    //         setOrders(response.data)
    //         console.log(response.data)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // }

    return (
        <div>
            {currentPosts &&
                currentPosts.map((order, index) => (
                    <div className="order-list-box-item" key={index}>
                        <div className="box-item"><span>상품 번호</span> <span>{order.productid}</span></div>
                        <div className="box-item"><span>상품명</span> <span><Link to={`/product/${order.productid}`}>{order.productname}</Link></span></div>
                        <div className="box-item"><span></span> <span><Link to={`/product/${order.productid}`}><img src={order.productimg} alt="img" /></Link></span></div>
                        <div className="box-item"><span>주문수량</span> <span>{order.productcount}</span></div>
                        <div className="box-item"><span>총금액</span> <span>{order.productprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></div>
                        <div className="box-item"><span>핸드폰</span> <span>{order.phone.toString().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3")}</span></div>
                        <div className="box-item"><span>주소</span> <span>[{order.address.slice(0,5)}] {order.address.slice(5)}</span></div>
                        <div className="box-item"><span>주문날짜</span> <span>{order.orderdate.slice(0,10)}</span></div>
                    </div> 
            ))}
            <Pagination postsPerPage={postsPerPage} totalPosts={post.length} paginate={paginate} />
        </div>
    )
}

export default MypageOne