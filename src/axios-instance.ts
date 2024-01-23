import axios from "axios"

export const instance = axios.create({
    baseURL:'https://6579694cf08799dc8046da0c.mockapi.io/',
    timeout:3000,
    headers:{

    }
})
