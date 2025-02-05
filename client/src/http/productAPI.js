import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type/add', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type/all');
    return data;
}

export const deleteType = async (typeId) => {
    const {message} = await $authHost.delete('api/type/delete/' + typeId);
    return message;
}

export const createProducer = async (producer, typeId) => {
    try {
        const {data} = await $authHost.post('api/producer/add', producer, typeId);
        return data;
    }catch (e){
        console.log(e.message);
    }
}

export const fetchProducers = async () => {
    const {data} = await $host.get('api/producer/all');
    return data;
}

export const deleteProducer = async (producerId) => {
    const {message} = await $authHost.delete('api/producer/delete/' + producerId);
    return message;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/add', product);
    return data;
}

export const fetchProducts = async (typeId, producerId, page, limit = 5) => {
    const {data} = await $host.get('api/product/all', {params: {
            typeId, producerId, page, limit}});
    return data;
}
export const deleteProduct = async (productId) => {
    const {message} = await $authHost.delete('api/product/delete/' + productId);
    return message;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id);
    console.log(`Fetched one product data: ${JSON.stringify(data)}`);
    return data;
}

export const updateProduct = async (product, productId) => {
    console.log(`product: ${JSON.stringify(product)}`);
    const {data} = await $authHost.put('api/product/update/' + productId, product);
    return data;
}

export const searchProductsByName = async (name) => {
    try {
        const { data } = await $host.get('/api/product/search', {
            params: { name }
        });
        console.log(`Fetched products: ${JSON.stringify(data)}`);
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

