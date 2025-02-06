import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    return jwtDecode(data);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data);
    return jwtDecode(data);
}

export const check = async () => {
    try {
        console.log('in check method!')
        const res = await $authHost.get('api/user/auth');
        console.log(`res status: ${res.status}`);
        if (res.status !== 401) {
            const {data} = res;
            localStorage.setItem('token', data);
            console.log(`received token: ${JSON.stringify(data)}`);
            return jwtDecode(data);
        }
        else{
            throw Error('unauthorized');
        }
    }
    catch (e){
        console.log(e.message);
    }
}