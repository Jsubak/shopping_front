import http from "../http-common"

const create = data => {
    return http.post("/orders", data);
}

const OrderService = {
    create
}

export default OrderService