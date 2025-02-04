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
        const res = await $authHost.get('api/user/auth');
        if (res.status !== 401) {
            const {data} = res;
            localStorage.setItem('token', data);
            return jwtDecode(data);
        }
    }
    catch (e){
        console.log(e.message);
    }
}