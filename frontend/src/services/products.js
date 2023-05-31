import axios from 'axios';

const URL = "http://localhost:8000/api";

export const getProducts = async () => {
    const response = await axios.get(`${URL}/products`);
    return response.data;
}
