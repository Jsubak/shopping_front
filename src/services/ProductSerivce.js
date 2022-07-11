import http from "../http-common";

const getAll = (params) => {
    return http.get("/product", { params });
}

const get = id => {
    return http.get(`/product/${id}`);
}

const create = data => {
    return http.post("/product", data);
}

const update = (id, data) => {
    return http.put(`/product/${id}`, data);
}

const remove = id => {
    return http.delete(`/product/${id}`)
}

const findByName = name => {
    return http.get(`/product?productname=${name}`);
}

const ProductService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
}

export default ProductService