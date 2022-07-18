import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService"
import "./css/productstyle.css"
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Userservice from "../services/user.service";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProductList = () => {
    const [product, setProduct] = useState([])
    const [searchName, setSearchName] = useState("")

    // const [content, setContent] = useState("");
    // useEffect(() => {
    //   Userservice.getPublicContent().then(
    //     (response) => {
    //       setContent(response.data);
    //     },
    //     (error) => {
    //       const _content =
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString();
    //       setContent(_content);
    //     }
    //   );
    // }, []);

    useEffect(() => {
        retrieveProduct();
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName);
    }

    const retrieveProduct = () => {
        ProductService.getAll()
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const findByName = () => {
        ProductService.findByName(searchName)
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="content">
            <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="상품명을 입력하세요"
                  value={searchName}
                  onChange={onChangeSearchName} />
                <div className="search-buttonbox">
                    <button
                      className="btn"
                      type="button"
                      onClick={findByName}
                    >
                        검색
                    </button>
                </div>
            </div>
            <div className="List">
                <h5>상품 목록</h5>
                <Box className="list-group" sx={{ flexGrow: 1 }}>
                    <Grid className="list-box" container spacing={2}>
                    {product &&
                        product.map((product, index) => (
                            <Grid className="list-box-grid" item xs={4} key={index}>
                                <Item className="list-box-item" key={index}>
                                    <Link to={`/product/${product.productid}`}><img src={product.productimg} alt="img1"/></Link>
                                    <div>{product.productprice}</div>
                                    <Link className="list-box-item-des" to={`/product/${product.productid}`}>{product.productname}</Link>
                                </Item>
                            </Grid>    
                        ))}
                    </Grid>
                </Box>
                <div></div>
            </div>
        </div>
    )
}

export default ProductList;