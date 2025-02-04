import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type/add', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type/all');
    return data;
}

export const createProducer = async (producer) => {
    try {
        const {data} = await $authHost.post('api/producer/add', producer);
        return data;
    }catch (e){
        console.log(e.message);
    }

}

export const fetchProducers = async () => {
    const {data} = await $host.get('api/producer/all');
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/add', product);
    return data;
}

export const fetchProducts = async () => {
    const {data} = await $host.get('api/product/all');
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id);
    return data;
}

