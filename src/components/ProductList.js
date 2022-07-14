import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService"
import "./css/productstyle.css"
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProductList = () => {
    const [product, setProduct] = useState([])
    const [setCurrentProduct] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

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

    // const refreshList = () => {
    //     retrieveProduct();
    //     setCurrentProduct(null);
    //     setCurrentIndex(-1);
    // }

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
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
                            <Grid item xs={4} key={index}>
                                <Item className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                onClick={() => setActiveProduct(product, index)}
                                key={index}>
                                    {product.productname}
                                    {/* <img src={`http://localhost:8081/public${product.productimg}`} alt="img1"/> */}
                                </Item>
                            </Grid>    
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default ProductList;