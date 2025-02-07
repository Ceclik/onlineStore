import {$authHost, $host} from "./index";

export const createType = async (type) => {
    try {
        const {data} = await $authHost.post('api/type/add', type);
        return data;
    }catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const fetchTypes = async () => {
    try {
        const {data} = await $host.get('api/type/all');
        return data;
    } catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const fetchOneType = async (id) => {
    try {
        const {data} = await $host.get('api/type/' + id);
        return data;
    } catch(e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const deleteType = async (typeId) => {
    const {message} = await $authHost.delete('api/type/delete/' + typeId);
    return message;
}

export const searchTypesByName = async (name) => {
    try {
        const { data } = await $host.get('/api/type/search', {
            params: { name }
        });
        return data;
    } catch (e) {
        alert(`Error: ${e.response.data}`);
        return [];
    }
};

export const createProducer = async (producer, typeId) => {
    try {
        const {data} = await $authHost.post('api/producer/add', producer, typeId);
        return data;
    }catch (e){
        alert(`Error: ${e.response.data}`);
    }
}

export const fetchProducers = async () => {
    try {
        const {data} = await $host.get('api/producer/all');
        return data;
    } catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const fetchOneProducer = async (id) => {
    try {
        const {data} = await $host.get('/api/producer/' + id);
        return data;
    } catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const searchProducersByName = async (name) => {
    try {
        const { data } = await $host.get('/api/producer/search', {
            params: { name }
        });
        return data;
    } catch (error) {
        alert("Error fetching types:" + error.response.data);
        return [];
    }
};

export const deleteProducer = async (producerId) => {
    const {message} = await $authHost.delete('api/producer/delete/' + producerId);
    return message;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/add', product);
    return data;
}

export const fetchProducts = async (typeId, producerId, page, limit = 5) => {
    try {
        const {data} = await $host.get('api/product/all', {
            params: {
                typeId, producerId, page, limit
            }
        });
        return data;
    } catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}
export const deleteProduct = async (productId) => {
    const {message} = await $authHost.delete('api/product/delete/' + productId);
    return message;
}

export const fetchOneProduct = async (id) => {
    try {
        const {data} = await $host.get('api/product/' + id);
        return data;
    }catch (e) {
        alert(`Error: ${e.response.data}`);
    }
}

export const updateProduct = async (product, productId) => {
    const {data} = await $authHost.put('api/product/update/' + productId, product);
    return data;
}

export const searchProductsByName = async (name) => {
    try {
        const { data } = await $host.get('/api/product/search', {
            params: { name }
        });
        return data;
    } catch (error) {
        alert("Error fetching products:" + error.response.data);
        return [];
    }
};

